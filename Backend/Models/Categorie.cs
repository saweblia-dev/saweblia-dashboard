using System.ComponentModel.DataAnnotations;
namespace Saweblia_Backend.Models;

public class Categorie
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Group { get; set; }
    public virtual Question? FirstQuestion { get; set; }
}