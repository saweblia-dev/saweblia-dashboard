using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.Repositories
{
    public class FactureRepository : IRepository<Facture>
    {
        private readonly MyDbContext _context;

        public FactureRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Facture>> GetAll()
        {
            return await _context.Factures.ToListAsync();
        }

        public async Task<Facture> GetById(int id)
        {
            return await _context.Factures.FindAsync(id);
        }

        public async Task<Facture> Create(Facture entity)
        {
            _context.Factures.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Facture> Update(Facture entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(int id)
        {
            var Facture = await _context.Factures.FindAsync(id);
            _context.Factures.Remove(Facture);
            await _context.SaveChangesAsync();
        }
    }
}
