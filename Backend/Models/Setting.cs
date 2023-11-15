using Saweblia_Backend.Data.DTOs;
using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models
{
    public class Setting
    {
        [Key]
        public int Id { get; set; }
        public double Artisan { get; set; } //PAHT
        public int Margin { get; set; }//from the calcul
        public double Pvttc { get; set; } //prix de chaque prestation
        /*public int IdPrestation { get; set; }*/
        public virtual Prestation? Prestation { get; set; }

    }
}
