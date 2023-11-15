using Saweblia_Backend.Models;

namespace Saweblia_Backend.Data.DTOs
{
    public class FactureDTO
    {
        public string Id { get; set; }
        public string TI { get; set; } = string.Empty;
        public string Quartier { get; set; } = string.Empty;
        public double Tarif { get; set; }
        public string Ville { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string MethodePayment { get; set; } = string.Empty;
        public string Full_name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Prestations { get; set; } = string.Empty;
        public string Desc { get; set; } = string.Empty;
        public int Annuler { get; set; }
        public virtual CommercialDTO? Commercial { get; set; }
        public virtual List<PrestationDTO> Prests { get; set; } = new();
        public double Fees_Val { set; get; }
        public double Assurance { set; get; }
        public virtual ICollection<SettingDTO> Settings { get; set; }
        public string Vendeur { get; set; } = string.Empty;

    }
}
