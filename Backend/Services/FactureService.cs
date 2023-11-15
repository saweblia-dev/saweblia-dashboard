using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Controllers;
using Saweblia_Backend.Data;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Data.Repositories;
using Saweblia_Backend.Models;
using Saweblia_Backend.Services.Interfaces;

namespace Saweblia_Backend.Services
{
    public class FactureService : IFactureService
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public FactureService(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task SaveFactureAsync(FactureDTO model)
        {
            try
            {
                List<Prestation> Pres = new List<Prestation>();
        CommercialController commercialController = new CommercialController(_context, _mapper);
                PrestationController prestationController = new PrestationController(_context, _mapper);

                // Map the PrestationDTOs to Prestation entities
                for (int i = 0; i < model.Prests.Count; i++)
                {
                    Pres.Add(prestationController.GetById(model.Prests[i].Id));
                }

                Facture facture = new Facture
                {
                    TI = model.TI,
                    Quartier = model.Quartier,
                    Tarif = model.Tarif,
                    Ville = model.Ville,
                    Date = model.Date,
                    MethodePayment = model.MethodePayment,
                    Full_name = model.Full_name,
                    Phone = model.Phone,
                    Prestations = model.Prestations,
                    Desc = model.Desc,
                    Annuler = model.Annuler,
                    Commercial = commercialController.GetById(model.Commercial.Id),
                    Prests = Pres,
                    Fees_Val = model.Fees_Val,
                    Assurance = model.Assurance,
                    Settings= model.Settings.Select(settingDTO =>
                    {
                        return new Setting
                        {
                            Artisan = settingDTO.Artisan,
                            Margin = settingDTO.Margin,
                            Pvttc = settingDTO.Pvttc,
                            Prestation=prestationController.GetById(settingDTO.IdPrestation)
                        };
                    }).ToList(),
                    Vendeur = model.Vendeur
                };

                _context.Factures.Add(facture);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                throw ex;
            }
        }

      
        public async Task<IEnumerable<Facture>> GetAllFacturesAsync()
        {
            try
            {
                // Récupérez toutes les factures depuis la base de données
                var factures = await _context.Factures.ToListAsync();
                return factures;
            }
            catch (Exception ex)
            {
                // Gérez les exceptions de manière appropriée
                throw ex;
            }
        }
        public Facture GetFactureById(string ti)
        {
            try
            {
                // Retrieve the facture by TI
                var facture = _context.Factures.FirstOrDefault(f => f.TI == ti);
                return facture;
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                throw ex;
            }
        }

        public async Task<IEnumerable<Facture>> GetFacturesByPhoneAsync(string tel)
        {
            try
            {
                // Retrieve factures by phone number
                var factures = await _context.Factures.Where(f => f.Phone == tel).ToListAsync();
                return factures;
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                throw ex;
            }
        }

        public void UpdateFactureStatus(string id, int newValue)
        {
            try
            {
                // Retrieve the facture by TI
                var facture = _context.Factures.FirstOrDefault(f => f.TI == id);
                if (facture != null)
                {
                    facture.Annuler = newValue;

                    // Update the facture in the context and save changes
                    _context.Factures.Update(facture);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions appropriately
                throw ex;
            }
        }
    }
}