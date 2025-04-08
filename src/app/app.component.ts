import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  title = '101329925_comp3133_assignment2';

  logout() {
    localStorage.removeItem('token');
    window.location.reload()
  }
}
