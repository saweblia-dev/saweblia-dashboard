using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models;
    public class Commercial
    {
        [Key]
        public int Id { get; set; }

        public string Mrbricolage { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }
