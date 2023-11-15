namespace Saweblia_Backend.Data.DTOs;

public class QteQuestionDTO:QuestionDTO
{
    public List<QteAnswerDTO> QteAnswers { get; set; }
    
}