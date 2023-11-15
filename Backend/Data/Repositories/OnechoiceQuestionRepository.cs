using Microsoft.EntityFrameworkCore;

using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.Repositories
{
    public class OnechoiceQuestionRepository : IRepository<OnechoiceQuestion>
    {
        private readonly MyDbContext _context;

        public OnechoiceQuestionRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<OnechoiceQuestion>> GetAll()
        {
            return await _context.OnechoiceQuestions.ToListAsync();
        }

        public async Task<OnechoiceQuestion> GetById(int id)
        {
            return await _context.OnechoiceQuestions.FindAsync(id);
        }

        public async Task<OnechoiceQuestion> Create(OnechoiceQuestion entity)
        {
            _context.OnechoiceQuestions.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<OnechoiceQuestion> Update(OnechoiceQuestion entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(int id)
        {
            var entity = await _context.OnechoiceQuestions.FindAsync(id);
            if (entity == null)
            {
                return;
            }
            _context.OnechoiceQuestions.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}