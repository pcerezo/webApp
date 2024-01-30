using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : ControllerBase
    {
        private readonly AplicationDBContext _dbContext;

        public ComentarioController(AplicationDBContext context) {
        
            _dbContext = context;
        }

        // GET: api/<ComentarioController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try { 
                var listComentarios = await _dbContext.Comentarios.ToListAsync();

                return Ok(listComentarios);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ComentarioController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try {
                var comentario = await _dbContext.Comentarios.FindAsync(id);

                if (comentario == null)
                {
                    return NotFound();
                }

                return Ok(comentario);
            }
            catch (Exception ex) { 
                return BadRequest($"Comentario: {ex.Message}");
            }
        }

        // POST api/<ComentarioController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Comentario comentario)
        {
            try {
                _dbContext.Add(comentario);
                await _dbContext.SaveChangesAsync();

                return Ok(comentario);
            }
            catch (Exception ex) {
                return BadRequest();
            }
        }

        // PUT api/<ComentarioController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Comentario comentario)
        {
            try {
                if (id != comentario.Id) {
                    return BadRequest();
                }
                
                _dbContext.Update(comentario);
                await _dbContext.SaveChangesAsync();

                return Ok(new {message = "Comentario actualizado con éxito"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ComentarioController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try {
                var comentario = await _dbContext.Comentarios.FindAsync(id);

                if (comentario == null) { 
                    return NotFound();
                }

                _dbContext.Comentarios.Remove(comentario);
                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "Comentario eliminado con éxito"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
