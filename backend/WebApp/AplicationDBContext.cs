using Microsoft.EntityFrameworkCore;
using WebApp.Models;

namespace WebApp
{
    public class AplicationDBContext: DbContext
    {
        public DbSet<Comentario> Comentarios { get; set; }

        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options) { }
    }
}
