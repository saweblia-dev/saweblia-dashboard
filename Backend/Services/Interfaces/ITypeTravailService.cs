using Saweblia_Backend.Data.DTOs;

namespace Saweblia_Backend.Services.Interfaces;

public interface ITypeTravailService
{
/*    Task<List<TypeTravailDTO>> GetAll();*/
    Task<TypeTravailDTO?> GetById(int id);
}