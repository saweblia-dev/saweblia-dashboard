using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Models;
using Saweblia_Backend.Data.DTOs;

namespace Saweblia_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestationController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public PrestationController(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("add")]
        public IActionResult AddPrestation([FromBody] PrestationDTO prestationDTO)
        {
            try
            {
                // Mapper la PrestationDTO en une entité Prestation
                var prestation = _mapper.Map<PrestationDTO, Prestation>(prestationDTO);

                // Ajoutez la prestation à votre contexte de base de données
                _context.Prestations.Add(prestation);
                _context.SaveChanges();

                // Retournez une réponse HTTP 201 (Created) avec la prestation ajoutée
                return CreatedAtAction("GetById", new { id = prestation.Id }, prestation);
            }
            catch (Exception ex)
            {
                // Gérez les exceptions appropriées ici
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet("all")]
        public IActionResult GetAllPrestations()
        {
            var prestations = _context.Prestations
                .Where(p => p.activation_prestation == true)
                .ToList();

            var prestationsDTOs = _mapper.Map<List<Prestation>, List<PrestationDTO>>(prestations);
            return Ok(prestationsDTOs);
        }

        [HttpGet("{id}")]
        public Prestation GetById(int id)
        {
            var prestation = _context.Prestations.FirstOrDefault(p => p.Id == id);

            return prestation;
        }

        [HttpPut("toggleActivation/{id}")]
        public IActionResult ToggleActivation(int id)
        {
            // Rechercher la prestation par ID
            var prestation = _context.Prestations.FirstOrDefault(p => p.Id == id);

            if (prestation == null)
            {
                return NotFound(); // Si la prestation avec l'ID donné n'existe pas, retournez une réponse NotFound.
            }

            // Inversez la valeur du champ activation_prestation (true => false, false => true)
            prestation.activation_prestation = !prestation.activation_prestation;

            _context.SaveChanges(); // Enregistrez les modifications dans la base de données

            // Retournez une réponse OK avec le nouvel état d'activation
            return Ok($"Activation de la prestation {prestation.Id} : {prestation.activation_prestation}");
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdatePrestation(int id, [FromBody] PrestationDTO updatedPrestationDTO)
        {
            try
            {
                // Recherchez la prestation existante par son ID
                var prestation = _context.Prestations.FirstOrDefault(p => p.Id == id);

                if (prestation == null)
                {
                    return NotFound(); // Si la prestation avec l'ID donné n'existe pas, retournez une réponse NotFound.
                }

                // Appliquez les modifications uniquement aux champs spécifiés dans le corps de la requête
                if (!string.IsNullOrEmpty(updatedPrestationDTO.Description))
                {
                    prestation.Description = updatedPrestationDTO.Description;
                }

                if (!string.IsNullOrEmpty(updatedPrestationDTO.SearchLibelle))
                {
                    prestation.SearchLibelle = updatedPrestationDTO.SearchLibelle;
                }

                if (!string.IsNullOrEmpty(updatedPrestationDTO.Libelle))
                {
                    prestation.Libelle = updatedPrestationDTO.Libelle;
                }

                if (updatedPrestationDTO.Taux_Horaire.HasValue)
                {
                    prestation.Taux_Horaire = updatedPrestationDTO.Taux_Horaire;
                }

                if (updatedPrestationDTO.Duree.HasValue)
                {
                    prestation.Duree = updatedPrestationDTO.Duree;
                }

                if (updatedPrestationDTO.Coefficient.HasValue)
                {
                    prestation.Coefficient = updatedPrestationDTO.Coefficient;
                }

                if (!string.IsNullOrEmpty(updatedPrestationDTO.Libelle_CRM))
                {
                    prestation.Libelle_CRM = updatedPrestationDTO.Libelle_CRM;
                }

                // Enregistrez les modifications dans la base de données
                _context.SaveChanges();

                return Ok("Prestation mise à jour avec succès");
            }
            catch (Exception ex)
            {
                // Gérez les exceptions appropriées ici
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }



    }
}
