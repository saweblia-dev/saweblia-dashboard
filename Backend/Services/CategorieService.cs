using AutoMapper;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Data.Repositories;
using Saweblia_Backend.Models;
using Saweblia_Backend.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Saweblia_Backend.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Saweblia_Backend.Services
{
    public class CategorieService : ICategorieService
    {
        private readonly CategorieRepository _categorieRepository;
        private readonly IMapper _mapper;
        private readonly MyDbContext _context;

        public CategorieService(CategorieRepository categorieRepository, IMapper mapper, MyDbContext context)
        {
            _categorieRepository = categorieRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<CategorieDTO>> GetAllCategories()
        {
            var categories = await _categorieRepository.GetAll();
            return _mapper.Map<List<CategorieDTO>>(categories);
        }

        public async Task<CategorieDTO> GetCategoryById(int id)
        {
            var category = await _categorieRepository.GetById(id);
            var data = _mapper.Map<CategorieDTO>(category);
            return data;
        }

      public async Task<bool> DeleteCategory(int id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                {
                    return false; // La cat�gorie n'a pas �t� trouv�e
                }

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return true; // La cat�gorie a �t� supprim�e avec succ�s
            }
            catch (Exception)
            {
                // G�rer les erreurs, par exemple, des probl�mes de base de donn�es
                return false;
            }
        }

        public async Task<Categorie> CreateCategory(Categorie newCategory)
        {
            // Exemple hypoth�tique en utilisant Entity Framework Core
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();

            // Vous pouvez personnaliser le code ci-dessus en fonction de votre logique m�tier et de votre acc�s aux donn�es

            return newCategory; // Renvoie la cat�gorie cr��e
        }
        public async Task<List<CategorieDTO>> GetCategoriesByGroup(string group)
        {
            // Impl�mentez la logique pour r�cup�rer les cat�gories par groupe
            return await _context.Categories
                .Where(c => c.Group == group)
                .Select(c => new CategorieDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Group = c.Group, // Assurez-vous d'inclure le champ Group
                    FirstQuestion = new QuestionDTO
                    {
                        // Impl�mentez la logique pour r�cup�rer la premi�re question li�e � la cat�gorie
                    }
                })
                .ToListAsync();
        }

   

    }
}
