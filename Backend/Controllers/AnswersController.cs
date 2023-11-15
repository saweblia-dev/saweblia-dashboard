using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Microsoft.Extensions.Logging;
using Saweblia_Backend.Data.DTOs;

using Saweblia_Backend.Models;

namespace Saweblia_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ILogger<AnswersController> _logger;
        public AnswersController(MyDbContext context, ILogger<AnswersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswers()  // Modifiez GetAnswer en GetAnswers
        {
            var answers = await _context.Answers.ToListAsync();

            if (answers == null)
            {
                return NotFound();
            }

            // Log des informations sur les réponses
            foreach (var answer in answers)
            {
                _logger.LogInformation($"Answer Id: {answer.Id}, CategoryId: {answer.CategoryId}");
            }

            // Filtrer les réponses dont CategoryId est non null
            var nonNullAnswers = answers.Where(a => a.CategoryId != null).ToList();

            return nonNullAnswers;
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            if (_context.Answer == null)
            {
                return NotFound();
            }
            var answer = await _context.Answer.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            return answer;
        }


        // GET: /Answers/ByCategory/{categoryId}
        [HttpGet("ByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswersByCategory(int categoryId)
        {
            var answersInCategory = await _context.Answers
                .Where(a => a.CategoryId == categoryId)
                .ToListAsync();

            if (answersInCategory == null)
            {
                return NotFound();
            }

            return answersInCategory;
        }

        // PUT: Answers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnswer(int id, AnswerDTO answerDto)
        {
            if (id != answerDto.Id)
            {
                return BadRequest("ID de réponse non valide.");
            }

            var answer = await _context.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            answer.Value = answerDto.Value;
            answer.CategoryId = answerDto.CategoryId;

            _context.Entry(answer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnswerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST:Answers

        [HttpPost]
        public async Task<ActionResult<Answer>> PostAnswer(AnswerDTO answerDto)
        {
            try
            {
                if (answerDto == null)
                {
                    return BadRequest("Réponse invalide.");
                }

                // Créer une nouvelle instance d'Answer à partir de AnswerDTO
                var answer = new Answer
                {
                    Value = answerDto.Value,
                    CategoryId = answerDto.CategoryId
                };

                _context.Answers.Add(answer);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAnswer", new { id = answer.Id }, answer);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la création de la réponse.");
                return StatusCode(500, "Une erreur s'est produite lors de la création de la réponse.");
            }
        }





        // DELETE: Answers/5

        /*  [HttpDelete("{id}")]
          public async Task<ActionResult> DeleteAnswer(int id)
          {
              var answer = await _context.Answers.FindAsync(id);

              if (answer == null)
              {
                  return NotFound();
              }

              _context.Answers.Remove(answer);
              await _context.SaveChangesAsync();

              return NoContent();
          }
        */

        // DELETE: Answers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);

            if (answer == null)
            {
                return NotFound();
            }

            // Delete associated MultiChoiceAnswer records
            var multiChoiceAnswers = await _context.MultiChoiceAnswer.Where(m => m.IdAnswer == id).ToListAsync();
            _context.MultiChoiceAnswer.RemoveRange(multiChoiceAnswers);

            // Remove the Answer record
            _context.Answers.Remove(answer);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnswerExists(int id)
        {
            return (_context.Answer?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}