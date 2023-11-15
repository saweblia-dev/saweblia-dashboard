using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Models;
using Saweblia_Backend.Data.DTOs;


namespace Saweblia_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MultiChoiceAnswersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public MultiChoiceAnswersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/MultiChoiceAnswers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MultiChoiceAnswer>>> GetMultiChoiceAnswer()
        {
          if (_context.MultiChoiceAnswer == null)
          {
              return NotFound();
          }
            return await _context.MultiChoiceAnswer.ToListAsync();
        }

        // GET: api/MultiChoiceAnswers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MultiChoiceAnswer>> GetMultiChoiceAnswer(int id)
        {
          if (_context.MultiChoiceAnswer == null)
          {
              return NotFound();
          }
            var multiChoiceAnswer = await _context.MultiChoiceAnswer.FindAsync(id);

            if (multiChoiceAnswer == null)
            {
                return NotFound();
            }

            return multiChoiceAnswer;
        }

        // GET: api/MultiChoiceAnswers/idanswer
        [HttpGet("idanswer/{idanswer}")]
        public async Task<ActionResult<IEnumerable<MultiChoiceAnswer>>> GetMultiChoiceAnswersByAnswerId(int idanswer)
        {
            if (_context.MultiChoiceAnswer == null)
            {
                return NotFound();
            }

            var multiChoiceAnswers = await _context.MultiChoiceAnswer.Where(m => m.IdAnswer == idanswer).ToListAsync();

            if (multiChoiceAnswers == null || multiChoiceAnswers.Count == 0)
            {
                return NotFound();
            }

            return multiChoiceAnswers;
        }

        // PUT: api/MultiChoiceAnswers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMultiChoiceAnswer(int id, MultiChoiceAnswer multiChoiceAnswer)
        {
            if (id != multiChoiceAnswer.Id)
            {
                return BadRequest();
            }

            _context.Entry(multiChoiceAnswer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MultiChoiceAnswerExists(id))
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

        // POST: api/MultiChoiceAnswers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // POST: api/MultiChoiceAnswers
        [HttpPost]
        public async Task<ActionResult<MultiChoiceAnswer>> PostMultiChoiceAnswer([FromBody] MultiChoiceAnswerDTO multiChoiceAnswerDTO)
        {
            try
            {
                if (_context.MultiChoiceAnswer == null)
                {
                    return NotFound();
                }

                // Map the DTO to your entity model
                var multiChoiceAnswer = new MultiChoiceAnswer
                {
                    Value = multiChoiceAnswerDTO.Value,
                    IdAnswer = multiChoiceAnswerDTO.IdAnswer
                };

                // Assuming you want to add the MultiChoiceAnswer to the database
                _context.MultiChoiceAnswer.Add(multiChoiceAnswer);
                await _context.SaveChangesAsync();

                // Return the created MultiChoiceAnswer along with a 201 Created status code
                return CreatedAtAction(nameof(GetMultiChoiceAnswer), new { id = multiChoiceAnswer.Id }, multiChoiceAnswer);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // DELETE: api/MultiChoiceAnswers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMultiChoiceAnswer(int id)
        {
            if (_context.MultiChoiceAnswer == null)
            {
                return NotFound();
            }
            var multiChoiceAnswer = await _context.MultiChoiceAnswer.FindAsync(id);
            if (multiChoiceAnswer == null)
            {
                return NotFound();
            }

            _context.MultiChoiceAnswer.Remove(multiChoiceAnswer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MultiChoiceAnswerExists(int id)
        {
            return (_context.MultiChoiceAnswer?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
