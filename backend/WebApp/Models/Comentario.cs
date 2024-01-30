using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace WebApp.Models
{
    public class Comentario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Creador { get; set; }

        [Required]
        public string Texto { get; set; }

        [Required]
        public DateTime FechaCreacion { get; set; }
    }
}
