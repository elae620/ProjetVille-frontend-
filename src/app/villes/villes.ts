import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ville } from '../model/ville.model';
import { VilleService } from '../services/ville';
import { AuthService } from '../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-villes',
  imports: [CommonModule, RouterLink],
  templateUrl: './villes.html'
})
export class Villes implements OnInit {
  villes!: Ville[];

  constructor(
    private villeService: VilleService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerVilles();
  }

  chargerVilles() {
    this.villeService.listeVilles().subscribe(villes => {
      console.log(villes);
      this.villes = villes;
    });
  }

  supprimerVille(v: Ville) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.villeService.supprimerVille(v.idVille).subscribe(() => {
        console.log('ville supprimée');
        this.chargerVilles();
      });
    }
  }
}
