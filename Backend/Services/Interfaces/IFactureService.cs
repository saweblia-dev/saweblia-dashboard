using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Services.Interfaces
{

    public interface IFactureService
    {
    Task SaveFactureAsync(FactureDTO model);
        Task<IEnumerable<Facture>> GetAllFacturesAsync();
        Facture GetFactureById(string ti);
    Task<IEnumerable<Facture>> GetFacturesByPhoneAsync(string tel);
    void UpdateFactureStatus(string id, int newValue);
}

}