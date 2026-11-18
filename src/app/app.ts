
import { Component, OnInit, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLinkWithHref,
  RouterLink,
  Router
} from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('ProjetVille');

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Récupérer le JWT sauvegardé dans LocalStorage
    this.authService.loadToken();

    // Vérifier si l'utilisateur possède un token valide
    if (!this.authService.getToken() || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }



  onLogout() {
    this.authService.logout();
  }
}
