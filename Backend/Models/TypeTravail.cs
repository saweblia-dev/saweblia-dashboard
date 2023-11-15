using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models;

public class TypeTravail
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Desciption { get; set; } = string.Empty;
    public virtual List<Categorie> Categories { get; set; } = new List<Categorie>();

}