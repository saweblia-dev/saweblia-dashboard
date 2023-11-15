using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.DTOs;

public class OnechoiceAnswerDTO : AnswerDTO
{
  
    public QuestionDTO NextQuestion { get; set; }
   
}