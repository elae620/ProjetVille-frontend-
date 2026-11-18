
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = 'http://localhost:8081/users';

  token: string | null = null;

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  private helper = new JwtHelperService();
  public registredUser: User = new User();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // 1. Authentification auprès du microservice Spring Boot
  login(user: User) {
    return this.http.post<User>(
      this.apiURL + '/login',
      user,
      { observe: 'response' }
    );
  }

  registerUser(user: User) {
  return this.http.post<User>(this.apiURL + '/register', user, { observe: 'response' });
}

  // 2. Sauvegarder le token JWT
  saveToken(jwt: string) {
    if (jwt.startsWith('Bearer ')) {
      jwt = jwt.substring(7);
    }
    localStorage.setItem('jwt', jwt);

    this.token = jwt;
    this.isloggedIn = true;

    this.decodeJWT();
  }

  // 3. Charger le token depuis LocalStorage
  loadToken() {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      if (jwt.startsWith('Bearer ')) {
        jwt = jwt.substring(7);
        localStorage.setItem('jwt', jwt);
      }
      this.token = jwt;
      this.decodeJWT();
    }
  }

  // 4. Récupérer le token JWT
  getToken(): string {
    return this.token ?? '';
  }

  // 5. Décoder le JWT pour récupérer les informations utilisateur
  decodeJWT() {
    if (!this.token) {
      return;
    }

    const decodedToken = this.helper.decodeToken(this.token);

    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  // 6. Vérifier si l'utilisateur possède le rôle ADMIN
isAdmin(): Boolean {
  if (!this.roles)
    return false;
  return this.roles.indexOf('ADMIN') >= 0;
}

  // 7. Vérifier si le token est expiré
  isTokenExpired(): Boolean {
    if (!this.token) {
      return true;
    }

    return this.helper.isTokenExpired(this.token);
  }

  // 8. Déconnexion
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = null;
    this.isloggedIn = false;

    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isloggedIn');

    this.router.navigate(['/login']);
  }

 

setRegistredUser(user: User) {
  this.registredUser = user;
}

getRegistredUser() {
  return this.registredUser;
}

validateEmail(code: string) {
  return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
}

}
