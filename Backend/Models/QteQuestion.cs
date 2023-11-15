namespace Saweblia_Backend.Models;

public class QteQuestion: Question
{
    public virtual List<QteAnswer> QteAnswers { get; set; } = new List<QteAnswer>();
}