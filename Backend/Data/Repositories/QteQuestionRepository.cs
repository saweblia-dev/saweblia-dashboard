using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.Repositories
{
    public class QteQuestionRepository : IRepository<QteQuestion>
    {
        private readonly MyDbContext _context;

        public QteQuestionRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<QteQuestion>> GetAll()
        {
            return await _context.QteQuestions.ToListAsync();
        }

        public async Task<QteQuestion> GetById(int id)
        {
            return await _context.QteQuestions.FindAsync(id);
        }

        public async Task<QteQuestion> Create(QteQuestion entity)
        {
            await _context.QteQuestions.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<QteQuestion> Update(QteQuestion entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(int id)
        {
            var entity = await _context.QteQuestions.FindAsync(id);
            _context.QteQuestions.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}