import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ville } from '../model/ville.model';
import { VilleService } from '../services/ville';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNom implements OnInit {
  villes: Ville[] = [];
  nomVille: string = '';
  searchTerm: string = '';

  constructor(private villeService: VilleService) {}

  ngOnInit(): void {
    this.chargerVilles();
  }

  chargerVilles() {
    this.villeService.listeVilles().subscribe(villes => {
      console.log(villes);
      this.villes = villes;
    });
  }

  rechercherVilles() {
    if (this.nomVille) {
      this.villeService.rechercherParNom(this.nomVille).subscribe(villes => {
        this.villes = villes;
      });
    } else {
      this.chargerVilles();
    }
  }

  onKeyUp(filterText: string) {
    this.searchTerm = filterText;
  }
}
