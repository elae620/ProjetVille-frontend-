
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html'
})
export class Login {

  user = new User();
  erreur: number = 0;
  err: number = 0;
  message: string = 'login ou mot de passe erronés..';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

onLoggedin() {
  this.authService.login(this.user).subscribe({
    next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.err = 1;
      if (err.error?.errorCause === 'disabled')
        this.message = 'Utilisateur désactivé, veuillez contacter votre administrateur';
      else
        this.message = 'login ou mot de passe erronés..';
    }
  });
}
}
