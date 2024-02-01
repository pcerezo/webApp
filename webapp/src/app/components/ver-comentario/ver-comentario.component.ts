import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../interfaces/Comentario';

@Component({
  selector: 'app-ver-comentario',
  standalone: true,
  imports: [],
  templateUrl: './ver-comentario.component.html',
  styleUrl: './ver-comentario.component.css'
})
export class VerComentarioComponent {
  id: Number;
  comentario: Comentario | undefined;

  constructor(private aRoute: ActivatedRoute, private _comentarioService: ComentarioService) {
    console.log("Id:" + this.aRoute.snapshot.paramMap.get('id'));
    this.id = + this.aRoute.snapshot.paramMap.get('id')!; // <-- '!' ignora los valores undefined o null.
  }

  ngOnInit(): void {
    this.getComentario();
  }

  getComentario() {
    this._comentarioService.getComentario(this.id).subscribe(data => {
      this.comentario = data;
    }, error => {
      console.log("Error: " + error);
    })
  }
}
