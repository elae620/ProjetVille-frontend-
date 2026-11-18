import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';                 // nouveau
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err = '';
  loading = false;                                          // nouveau : le spinner

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService                           // nouveau
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    this.loading = true;                                    // nouveau : on affiche le spinner
    this.err = '';                                          // nouveau : on efface l'ancienne erreur

    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.loading = false;                               // nouveau : on cache le spinner
        this.authService.setRegistredUser(this.user);
        this.toastr.success('Veuillez confirmer votre email', 'Confirmation');   // remplace alert()
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        this.loading = false;                               // nouveau : on cache le spinner
        if (err.error?.message) {
          this.err = err.error.message;
        } else if (err.status === 400) {
          this.err = err.error?.message || 'Requête invalide';
        } else {
          this.err = 'Une erreur est survenue, veuillez réessayer.';
        }
      }
    });
  }
}