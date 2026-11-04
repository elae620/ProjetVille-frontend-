import { Injectable } from '@angular/core';
import { Ville } from '../model/ville.model';
import { Pays } from '../model/pays.model';
import { PaysWrapper } from '../model/paysWrapped.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  apiURL: string = environment.apiURL;
  apiURLPays: string = environment.apiURLPays;

  constructor(private http: HttpClient) {}

  listeVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.apiURL);
  }

  ajouterVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(this.apiURL, ville, httpOptions);
  }

  supprimerVille(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterVille(id: number): Observable<Ville> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Ville>(url);
  }

  updateVille(ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(this.apiURL, ville, httpOptions);
  }

  listePays(): Observable<PaysWrapper> {
    return this.http.get<PaysWrapper>(this.apiURLPays);
  }

  consulterPays(id: number): Observable<Pays> {
    const url = `${this.apiURLPays}/${id}`;
    return this.http.get<Pays>(url);
  }

  rechercherParPays(idPays: number): Observable<Ville[]> {
    const url = `${this.apiURL}/villepays/${idPays}`;
    return this.http.get<Ville[]>(url);
  }

  rechercherParNom(nom: string): Observable<Ville[]> {
    const url = `${this.apiURL}/villesByName/${nom}`;
    return this.http.get<Ville[]>(url);
  }

  ajouterPays(p: Pays): Observable<Pays> {
    return this.http.post<Pays>(this.apiURLPays, p, httpOptions);
  }

  modifierPays(p: Pays): Observable<Pays> {
    const url = `${this.apiURLPays}/${p.idPays}`;
    return this.http.put<Pays>(url, p, httpOptions);
  }
}
