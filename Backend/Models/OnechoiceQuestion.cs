namespace Saweblia_Backend.Models;

public class OnechoiceQuestion : Question
{
    
    public virtual List<OnechoiceAnswer> Answers { get; set; } = new List<OnechoiceAnswer>();
    
}