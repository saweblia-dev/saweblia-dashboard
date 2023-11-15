using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Saweblia_Backend.Services.Interfaces
{
    public interface ICategorieService
    {
        Task<List<CategorieDTO>> GetAllCategories();
        Task<CategorieDTO> GetCategoryById(int id);
        Task<Categorie> CreateCategory(Categorie newCategory);
        Task<bool> DeleteCategory(int id);
        Task<List<CategorieDTO>> GetCategoriesByGroup(string group);


    }
}