using Microsoft.AspNetCore.Identity;
using MySqlX.XDevAPI;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Saweblia_Backend.Models;

public class Facture
{
    [Key]
    public int Id { get; set; }
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
    public virtual Commercial? Commercial { get; set; } = null;
    public virtual List<Prestation> Prests { get; set; } = new List<Prestation>();
    public double Fees_Val { set; get; }
    public double Assurance { set; get; }
    public virtual ICollection<Setting> Settings { get; set; }
    public string Vendeur { get; set; } = string.Empty;
}