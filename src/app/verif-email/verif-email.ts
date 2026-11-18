import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verif-email.html',
  styleUrl: './verif-email.css'
})
export class VerifEmail implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // On récupère l'utilisateur qui vient de s'inscrire
    this.user = this.authService.getRegistredUser();
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
      this.toastr.success('Email validé avec succès', 'Confirmation');
        // Le compte est activé : on connecte l'utilisateur automatiquement
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      error: (err: any) => {
        if (err.error?.errorCode === 'INVALID_TOKEN')
          this.err = 'Code invalide !';
        else if (err.error?.errorCode === 'EXPIRED_TOKEN')
          this.err = 'Code a expiré !';
        else
          this.err = err.error?.message ?? 'Une erreur est survenue.';
      }
    });
  }
}