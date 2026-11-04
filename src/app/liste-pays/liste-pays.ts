import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pays } from '../model/pays.model';
import { VilleService } from '../services/ville';
import { UpdatePays } from '../update-pays/update-pays';

@Component({
  selector: 'app-liste-pays',
  standalone: true,
  imports: [CommonModule, UpdatePays],
  templateUrl: './liste-pays.html'
})
export class ListePays implements OnInit {
  paysList: Pays[] = [];
  updatedPays: Pays = { idPays: 0, nomPays: '' };
  ajout: boolean = true;

  constructor(private villeService: VilleService) {}

  ngOnInit(): void {
    this.chargerPays();
  }

  chargerPays() {
    this.villeService.listePays().subscribe(pays => {
      this.paysList = pays._embedded?.pays || (pays._embedded as any)?.payses || [];
      console.log(pays);
    });
  }

  updatePays(p: Pays) {
    this.updatedPays = p;
    this.ajout = false;
  }

  paysUpdated(p: Pays) {
    console.log('Pays updated event', p);
    const requete = this.ajout
      ? this.villeService.ajouterPays(p)
      : this.villeService.modifierPays(p);

    requete.subscribe(() => {
      this.chargerPays();
      this.updatedPays = { idPays: 0, nomPays: '' };
      this.ajout = true;
    });
  }
}
