import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ProjetVille');

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let isloggedin: string | null = localStorage.getItem('isloggedIn');
    let loggedUser: string | null = localStorage.getItem('loggedUser');
    if (isloggedin !== 'true' || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
