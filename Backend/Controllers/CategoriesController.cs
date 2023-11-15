using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Models;
using Saweblia_Backend.Services.Interfaces;

namespace Saweblia_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ICategorieService _categorieService; // Ajoutez cette ligne
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(MyDbContext context, ICategorieService categorieService, ILogger<CategoriesController> logger)
        {
            _context = context;
            _categorieService = categorieService; // Ajoutez cette ligne
            _logger = logger;
        }


        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<List<Categorie>>> GetCategories()
        {
            var categories = await _categorieService.GetAllCategories();
            if (categories == null)
            {
                return NotFound();
            }
            return Ok(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categorie>> GetCategorie(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var categorie = await _context.Categories.FindAsync(id);

            if (categorie == null)
            {
                return NotFound();
            }

            return categorie;
        }


   
        

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Categorie>> PostCategorie(Categorie categorie)
        {
            if (_context.Categories == null)
            {
                return Problem("Entity set 'MyDbContext.Categories'  is null.");
            }
            _context.Categories.Add(categorie);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategorie", new { id = categorie.Id }, categorie);
        }







        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategorie(int id, Categorie updatedCategorie)
        {
            // Check if the provided ID matches an existing category
            if (!CategorieExists(id))
            {
                return NotFound();
            }

            // Retrieve the existing category from the database
            var existingCategorie = await _context.Categories.FindAsync(id);

            // Update properties of the existing category
            existingCategorie.Name = updatedCategorie.Name;
            existingCategorie.Group = updatedCategorie.Group;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return a 204 No Content response
            return NoContent();
        }





        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategorie(int id)
        {
            var categorie = await _context.Categories.FindAsync(id);
            if (categorie == null)
            {
                return NotFound();
            }

            // Log relevant information
            _logger.LogInformation($"Deleting category with ID: {id}");

            // Récupérer toutes les réponses liées à la catégorie spécifiée
            var answersToDelete = await _context.Answers
                .Where(a => a.CategoryId == id)
                .ToListAsync();

            // Log the number of answers to be deleted
            _logger.LogInformation($"Deleting {answersToDelete.Count} related answers.");

            // Supprimer les réponses liées
            if (answersToDelete != null && answersToDelete.Any())
            {
                var answerIdsToDelete = answersToDelete.Select(a => a.Id);

                // Delete associated MultiChoiceAnswer records
                var multiChoiceAnswersToDelete = await _context.MultiChoiceAnswer
                    .Where(m => answerIdsToDelete.Contains(m.IdAnswer))
                    .ToListAsync();
                _context.MultiChoiceAnswer.RemoveRange(multiChoiceAnswersToDelete);
            }

            // Log relevant information
            _logger.LogInformation($"Deleting category: {categorie.Name}");

            // Supprimer la catégorie
            _context.Categories.Remove(categorie);

            // Log relevant information
            _logger.LogInformation($"Saving changes to the database.");

            // Enregistrez les modifications dans la base de données
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // GET: api/Categories/ByGroup/{group}
        [HttpGet("ByGroup/{group}")]
        public async Task<ActionResult<IEnumerable<Categorie>>> GetCategoriesByGroup(string group)
        {
            var categories = await _context.Categories
                .Where(c => c.Group == group)
                .ToListAsync();

            if (categories == null || !categories.Any())
            {
                return NotFound();
            }

            return Ok(categories);
        }

        private bool CategorieExists(int id)
        {
            return (_context.Categories?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}