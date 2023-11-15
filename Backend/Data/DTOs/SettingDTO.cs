using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.DTOs
{
    public class SettingDTO
    {
        public double Artisan { get; set; } //PAHT
        public int Margin { get; set; }//from the calcul
        public double Pvttc { get; set; } //prix de chaque prestation
        public int IdPrestation { get; set; }
    }
}
