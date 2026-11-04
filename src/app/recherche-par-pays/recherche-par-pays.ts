import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ville } from '../model/ville.model';
import { Pays } from '../model/pays.model';
import { VilleService } from '../services/ville';

@Component({
  selector: 'app-recherche-par-pays',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-pays.html'
})
export class RechercheParPays implements OnInit {
  villes: Ville[] = [];
  IdPays!: number;
  paysList: Pays[] = [];

  constructor(private villeService: VilleService) {}

  ngOnInit(): void {
    this.villeService.listePays().subscribe(pays => {
      this.paysList = pays._embedded?.pays || (pays._embedded as any)?.payses || [];
      console.log(pays);
    });
  }

  onChange() {
    this.villeService.rechercherParPays(this.IdPays).subscribe(villes => {
      this.villes = villes;
    });
  }
}
