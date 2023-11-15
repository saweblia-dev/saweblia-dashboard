namespace Saweblia_Backend.Models
{
    public class MultiChoiceAnswer
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public int IdAnswer { get; set; }

        // Make the property virtual
        public virtual Answer Answer { get; set; }
    }
}
