namespace Saweblia_Backend.Data.DTOs
{
    public class MultiChoiceAnswerDTO
    {
        public int Id { get; set; }

        public string Value { get; set; }

        public int IdAnswer { get; set; }

        public MultiChoiceAnswerDTO(int id, string value, int idAnswer)
        {
            Id = id;
            Value = value;
            IdAnswer = idAnswer;
        }

    }
}
