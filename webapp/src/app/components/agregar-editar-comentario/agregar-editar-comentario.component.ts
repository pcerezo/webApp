import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comentario } from '../../interfaces/Comentario';
import { Router, RouterLink } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrl: './agregar-editar-comentario.component.css'
})
export class AgregarEditarComentarioComponent {
  agregarComentario: FormGroup;
  
  constructor(private fb: FormBuilder, private _comentarioService: ComentarioService, private router: Router) {
    this.agregarComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required], 
      texto: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregar(event: Event) {
    //event.preventDefault();
    console.log(this.agregarComentario);
    const comentario: Comentario = {
      titulo: this.agregarComentario.get('titulo')?.value,
      creador: this.agregarComentario.get('creador')?.value,
      texto: this.agregarComentario.get('texto')?.value,
      fechaCreacion: new Date
    }
    console.log(comentario);
    this._comentarioService.saveComentario(comentario).subscribe(data => {
      this.router.navigate(['/']);
    }, error => {
      console.log("Error: " + error);
    })
  }
}
