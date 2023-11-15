using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.DTOs;

public class TypeTravailDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Desciption { get; set; }= string.Empty;
    public List<MiniCategorieDto> Categories { get; set; } = new();
}