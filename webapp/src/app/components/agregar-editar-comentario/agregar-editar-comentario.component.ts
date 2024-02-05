import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comentario } from '../../interfaces/Comentario';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrl: './agregar-editar-comentario.component.css'
})
export class AgregarEditarComentarioComponent {
  formComentario!: FormGroup;
  id: number | null;
  comentario!: Comentario;
  accion = 'Agregar';
  
  constructor(private fb: FormBuilder, private _comentarioService: ComentarioService, private router: Router, private aRoute: ActivatedRoute) {
    this.formComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required], 
      texto: ['', Validators.required]
    });

    console.log("ID: " + this.aRoute.snapshot.paramMap.get('id'));
    if (this.aRoute.snapshot.paramMap.get('id') == null) {
      this.id = null;
    }
    else {
      this.id = + this.aRoute.snapshot.paramMap.get('id')!;
    }
    this.rellenarFormulario();
  }

  ngOnInit(): void {
    this.ajustarAccion();
  }

  ajustarAccion() {
    if (this.id == undefined || this.id == null || this.id == 0) {
      this.accion = "Agregar";
    }
    else {
      this.accion = "Editar";
    }
  }

  rellenarFormulario() {
    if (this.id != undefined || this.id != null) {
      this._comentarioService.getComentario(this.id).subscribe( data => {
        this.comentario = data;
        this.formComentario.patchValue({
          titulo: this.comentario.titulo,
          creador: this.comentario.creador, 
          texto: this.comentario.texto
        });
      }, error => {
        /*this.formComentario = this.fb.group({
          titulo: ['', Validators.required],
          creador: ['', Validators.required], 
          texto: ['', Validators.required]
        });*/
        console.error("Error al obtener los datos del comentario: " + error);
      });
    }
  }

  agregar() {
    //event.preventDefault();
    console.log(this.formComentario);
    const comentario: Comentario = {
      titulo: this.formComentario.get('titulo')?.value,
      creador: this.formComentario.get('creador')?.value,
      texto: this.formComentario.get('texto')?.value,
      fechaCreacion: this.comentario.fechaCreacion
    }
    console.log(comentario);
    this._comentarioService.saveComentario(comentario).subscribe(data => {
      this.router.navigate(['/']);
    }, error => {
      console.log("Error: " + error);
    })
  }

  editarComentario() {
    const comentario: Comentario = {
      id: this.comentario.id,
      titulo: this.formComentario.get('titulo')?.value,
      creador: this.formComentario.get('creador')?.value,
      texto: this.formComentario.get('texto')?.value,
      fechaCreacion: new Date
    }
    if (this.id != null) {
      this._comentarioService.updateComentario(this.id, comentario).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log("Error en edición: " + error);
      });
    }
  }

  submit(event: Event) {
    if (this.id == null) {
      this.agregar();
    }
    else {
      this.editarComentario();
    }
  }
}
