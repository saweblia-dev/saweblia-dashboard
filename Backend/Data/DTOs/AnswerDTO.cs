namespace Saweblia_Backend.Data.DTOs;

public class AnswerDTO
{
    public int Id { get; set; }
    public string Value { get; set; }
    public int CategoryId { get; set; }
    public PrestationDTO? Prestation { get; set; } 

}