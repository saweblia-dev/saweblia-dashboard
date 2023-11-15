using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; } = string.Empty;

        // Ajoutez le champ CategoryId
        public int CategoryId { get; set; }

        public virtual Prestation? Prestation { get; set; } = null;

        // Remplacez CategoryId par Category
        public virtual Categorie Category { get; set; }  // Utilisez le nom correct de la classe Categorie
    }
}
