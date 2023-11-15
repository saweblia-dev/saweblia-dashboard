using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Models;
using Saweblia_Backend.Services;

namespace Saweblia_Backend.Data.Repositories
{
    public class CategorieRepository : IRepository<Categorie>
    {
        private readonly MyDbContext _context;

        public CategorieRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Categorie>> GetAll()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Categorie> GetById(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Categorie> Create(Categorie entity)
        {
            _context.Categories.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Categorie> Update(Categorie entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

      

        public async Task Delete(int id)
        {
            var categorie = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(categorie);
            await _context.SaveChangesAsync();
        }
    }
}