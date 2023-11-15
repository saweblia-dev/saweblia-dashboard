using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models;

public abstract class Question 
{
    [Key]
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
}