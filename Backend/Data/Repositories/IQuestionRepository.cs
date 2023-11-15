using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.Repositories;

public interface IQuestionRepository : IRepository<Question>
{
    Task<Question> GetByIdWithOnechoiceAnswers(int id);
    Task<Question> GetByIdWithQteAnswers(int id);
}