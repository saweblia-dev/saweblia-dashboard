using System.ComponentModel.DataAnnotations;

namespace Saweblia_Backend.Models
{
    public class Fee
    {
        [Key]
        public int Id_Fees { set; get; }
        public double Fees_Val { set; get; }
        public double Assurance { set; get; }//= 14.17
        public int Margin { set; get; }//= 30%
        public double Fees_SW { set; get; }//= 16.38
        public double Fees_Artisan { set; get; }//= 16.375
    }
}
