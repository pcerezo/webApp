import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  img = 'https://th.bing.com/th/id/OIG.GdaG5Mt_3XFvycSdqtCw?w=1024&h=1024&rs=1&pid=ImgDetMain';

  constructor() {}

  ngOnInit(): void {}
}
