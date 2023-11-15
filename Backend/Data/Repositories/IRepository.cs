
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Saweblia_Backend.Data.Repositories
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task Delete(int id);
    }
}