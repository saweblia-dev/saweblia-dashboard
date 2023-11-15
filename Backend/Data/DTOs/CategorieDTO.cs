using System.Collections;
using System.Text.Json.Serialization;

namespace Saweblia_Backend.Data.DTOs
{
    public class MiniCategorieDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Group { get; set; }
    }
    public class CategorieDTO : MiniCategorieDto
    {
        [JsonIgnore]
        public QuestionDTO FirstQuestion { get; set; }
    }
}

