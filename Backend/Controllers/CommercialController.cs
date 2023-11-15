using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Saweblia_Backend.Data;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CommercialController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;

        public CommercialController(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //Get all Bills from database;

        [HttpGet]
        public ActionResult<IEnumerable<Commercial>> GetAllcommerciaux()
        {
            return _context.commercials.ToList();
        }

        [HttpGet("{id}")]
        public Commercial GetById(int id)
        {
            var commerce = _context.commercials.FirstOrDefault(c => c.Id == id);

            return commerce;
        }

        [HttpPost]
        public ActionResult<CommercialDTO> AddCommercial([FromBody] CommercialDTO commercialDTO)
        {
            try
            {
                // Mapper les données du DTO vers le modèle Commercial
                var newCommercial = _mapper.Map<Commercial>(commercialDTO);

                // Ajouter le nouveau commercial à la base de données
                _context.commercials.Add(newCommercial);
                _context.SaveChanges();

                // Mapper le modèle Commercial créé vers CommercialDTO
                var createdCommercialDTO = _mapper.Map<CommercialDTO>(newCommercial);

                // Retourner un code de statut 201 (Created) avec l'objet commercial créé
                return CreatedAtAction("GetCommercialById", new { id = createdCommercialDTO.Id }, createdCommercialDTO);
            }
            catch (Exception ex)
            {
                // En cas d'erreur, renvoyer une réponse d'erreur avec un code 500 (Internal Server Error)
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut("{id}")]
        public IActionResult UpdateCommercial(int id, [FromBody] CommercialDTO updatedCommercialDTO)
        {
            try
            {
                // Recherchez le commercial existant par son ID
                var existingCommercial = _context.commercials.FirstOrDefault(c => c.Id == id);

                if (existingCommercial == null)
                {
                    return NotFound(); // Si le commercial avec l'ID donné n'existe pas, retournez une réponse NotFound.
                }

                // Mettez à jour les propriétés du commercial existant avec les données du DTO
                existingCommercial.Mrbricolage = updatedCommercialDTO.Mrbricolage;
                existingCommercial.Name = updatedCommercialDTO.Name;

                // Enregistrez les modifications dans la base de données
                _context.SaveChanges();

                // Retournez une réponse OK avec un message de réussite
                return Ok("Commercial mis à jour avec succès");
            }
            catch (Exception ex)
            {
                // Gérez les exceptions appropriées ici
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteCommercial(int id)
        {
            try
            {
                // Recherchez le commercial par ID
                var commercial = _context.commercials.FirstOrDefault(c => c.Id == id);

                if (commercial == null)
                {
                    return NotFound(); // Si le commercial avec l'ID donné n'existe pas, retournez une réponse NotFound.
                }

                // Supprimez le commercial de votre contexte de base de données
                _context.commercials.Remove(commercial);
                _context.SaveChanges();

                return Ok("Commercial supprimé avec succès");
            }
            catch (Exception ex)
            {
                // Gérez les exceptions appropriées ici
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
