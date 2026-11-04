import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ville } from '../model/ville.model';
import { Pays } from '../model/pays.model';
import { VilleService } from '../services/ville';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ville',
  imports: [FormsModule],
  templateUrl: './add-ville.html'
})
export class AddVille implements OnInit {
  newVille = new Ville();
  paysList!: Pays[];
  newIdPays!: number;

  constructor(private villeService: VilleService, private router: Router) {}

  ngOnInit(): void {
    this.villeService.listePays().subscribe(pays => {
      this.paysList = pays._embedded?.pays || (pays._embedded as any)?.payses || [];
      console.log(pays);
    });
  }

  addVille() {
    this.newVille.pays = this.paysList.find(p => p.idPays == this.newIdPays)!;
    this.villeService.ajouterVille(this.newVille).subscribe(ville => {
      console.log(ville);
      this.router.navigate(['villes']);
    });
  }
}
