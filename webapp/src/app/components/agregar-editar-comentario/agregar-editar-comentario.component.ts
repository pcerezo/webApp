import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comentario } from '../../interfaces/Comentario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-comentario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrl: './agregar-editar-comentario.component.css'
})
export class AgregarEditarComentarioComponent {
  agregarComentario: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.agregarComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required], 
      texto: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregar(event: Event) {
    event.preventDefault();
    console.log(this.agregarComentario);
    const comentario: Comentario = {
      titulo: this.agregarComentario.get('titulo')?.value,
      creador: this.agregarComentario.get('creador')?.value,
      texto: this.agregarComentario.get('texto')?.value,
      fechaCreacion: new Date().toDateString()
    }

    console.log(comentario);
  }
}
