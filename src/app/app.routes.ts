import { Routes } from '@angular/router';
import { Villes } from './villes/villes';
import { AddVille } from './add-ville/add-ville';
import { UpdateVille } from './update-ville/update-ville';
import { RechercheParPays } from './recherche-par-pays/recherche-par-pays';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { ListePays } from './liste-pays/liste-pays';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { villeGuard } from './ville.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/villes', pathMatch: 'full' },
  { path: 'villes', component: Villes },
  { path: 'add-ville', component: AddVille, canActivate: [villeGuard] },
  { path: 'updateVille/:id', component: UpdateVille, canActivate: [villeGuard] },
  { path: 'rechercheParPays', component: RechercheParPays },
  { path: 'rechercheParNom', component: RechercheParNom },
  { path: 'listePays', component: ListePays },
  { path: 'login', component: Login },
  { path: 'app-forbidden', component: Forbidden }
];
