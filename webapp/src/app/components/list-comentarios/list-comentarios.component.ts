import { Component } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-comentarios',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './list-comentarios.component.html',
  styleUrl: './list-comentarios.component.css'
})
export class ListComentariosComponent {
  listComentarios: Comentario[] = [
    {titulo: 'Angular', creador: 'Yo', fechaCreacion: new Date().toLocaleDateString(), texto: 'Probando un comentario'},
    {titulo: 'Angular', creador: 'Pepito', fechaCreacion: new Date().toLocaleDateString(), texto: 'Pepito también está probando un comentario'}
  ];

  constructor(private _comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.getComentarios();
  }

  getComentarios() {
    this._comentarioService.getListComentarios().subscribe(
      data => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

}
