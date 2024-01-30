import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComentariosComponent } from './components/list-comentarios/list-comentarios.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComentariosComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webapp';
}
