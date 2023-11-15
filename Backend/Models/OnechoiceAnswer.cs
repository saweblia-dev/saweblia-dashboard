using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models;

public class OnechoiceAnswer : Answer
{
public virtual Question? NextQuestion { get; set; }
public virtual OnechoiceQuestion Question { get; set; } = new();
   
}