import { Injectable } from '@angular/core';
import { Ville } from '../model/ville.model';
import { Pays } from '../model/pays.model';
import { PaysWrapper } from '../model/paysWrapped.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  apiURL: string = environment.apiURL;
  apiURLPays: string = environment.apiURLPays;

  constructor(private http: HttpClient) {}

  // ---------- VILLES ----------

  listeVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.apiURL + '/all').pipe(
      map(villes => villes.sort((a, b) => a.idVille - b.idVille))
    );
  }

  ajouterVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(this.apiURL + '/addville', ville);
  }

  supprimerVille(id: number) {
    const url = `${this.apiURL}/delville/${id}`;
    return this.http.delete(url);
  }

  consulterVille(id: number): Observable<Ville> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Ville>(url);
  }

  updateVille(ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(this.apiURL + '/updateville', ville);
  }

  rechercherParPays(idPays: number): Observable<Ville[]> {
    const url = `${this.apiURL}/villespays/${idPays}`;
    return this.http.get<Ville[]>(url).pipe(
      map(villes => villes.sort((a, b) => a.idVille - b.idVille))
    );
  }

  rechercherParNom(nom: string): Observable<Ville[]> {
    const url = `${this.apiURL}/villesByName/${nom}`;
    return this.http.get<Ville[]>(url);
  }

  // ---------- PAYS ----------

  listePays(): Observable<PaysWrapper> {
    // Garde ici le tri par idPays si tu l'avais ajouté dans le service
    return this.http.get<PaysWrapper>(this.apiURLPays);
  }

  consulterPays(id: number): Observable<Pays> {
    const url = `${this.apiURLPays}/${id}`;
    return this.http.get<Pays>(url);
  }

  ajouterPays(p: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.apiURLPays, p);
  }

  modifierPays(p: Pays): Observable<Pays> {
    const url = `${this.apiURLPays}/${p.idPays}`;
    return this.http.put<Pays>(url, p);
  }
}