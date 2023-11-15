using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models;

public class QteAnswer : Answer
{
   public virtual QteQuestion Question { get; set; } = new();
 
}