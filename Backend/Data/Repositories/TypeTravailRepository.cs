using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.Repositories
{
    public class TypeTravailRepository : IRepository<TypeTravail>
    {
        private readonly MyDbContext _context;
        public TypeTravailRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<TypeTravail>> GetAll()
        {
            return await _context.TypeTravails.ToListAsync();
        }

        public async Task<TypeTravail> GetById(int id)
        {
            return await _context.TypeTravails.FindAsync(id);
        }

        public async Task<TypeTravail> Create(TypeTravail entity)
        {
            _context.TypeTravails.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<TypeTravail> Update(TypeTravail entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(int id)
        {
            var typeTravail = await _context.TypeTravails.FindAsync(id);
            _context.TypeTravails.Remove(typeTravail);
            await _context.SaveChangesAsync();
        }
    }
}