using Saweblia_Backend.Models;
using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Data.DTOs;

public class PrestationDTO
{
    [Key]
    public int Id { get; set; }
    public String Description { get; set; } = string.Empty;
    public String SearchLibelle { get; set; } = string.Empty;
    public String Libelle { get; set; } = string.Empty;
    public double? Taux_Horaire { get; set; }
    public double? Duree { get; set; } 
    public double? Coefficient { get; set; }
    public String Libelle_CRM { get; set; } = string.Empty;
    /* public String TypePrestation { get; set; } = string.Empty;*/
    public bool activation_prestation { get; set; } = true;

    /*    public double? quantite { get; set;}*/
}