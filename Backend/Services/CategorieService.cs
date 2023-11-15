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
                    return false; // La catégorie n'a pas été trouvée
                }

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return true; // La catégorie a été supprimée avec succès
            }
            catch (Exception)
            {
                // Gérer les erreurs, par exemple, des problèmes de base de données
                return false;
            }
        }

        public async Task<Categorie> CreateCategory(Categorie newCategory)
        {
            // Exemple hypothétique en utilisant Entity Framework Core
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();

            // Vous pouvez personnaliser le code ci-dessus en fonction de votre logique métier et de votre accès aux données

            return newCategory; // Renvoie la catégorie créée
        }
        public async Task<List<CategorieDTO>> GetCategoriesByGroup(string group)
        {
            // Implémentez la logique pour récupérer les catégories par groupe
            return await _context.Categories
                .Where(c => c.Group == group)
                .Select(c => new CategorieDTO
                {
                    Id = c.Id,
                    Name = c.Name,
                    Group = c.Group, // Assurez-vous d'inclure le champ Group
                    FirstQuestion = new QuestionDTO
                    {
                        // Implémentez la logique pour récupérer la première question liée à la catégorie
                    }
                })
                .ToListAsync();
        }

   

    }
}
