import { Component, OnInit } from '@angular/core';
import { Ville } from '../model/ville.model';
import { Pays } from '../model/pays.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VilleService } from '../services/ville';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-ville',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-ville.html',
  styles: ``
})
export class UpdateVille implements OnInit {
  currentVille = new Ville();
  paysList!: Pays[];
  updatedPaysId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private villeService: VilleService
  ) {}

  ngOnInit(): void {
    this.villeService.listePays().subscribe(pays => {
      console.log(pays);
      this.paysList = pays._embedded?.pays || (pays._embedded as any)?.payses || [];
    });

    this.villeService
      .consulterVille(this.activatedRoute.snapshot.params['id'])
      .subscribe(ville => {
        this.currentVille = ville;
        this.updatedPaysId = this.currentVille.pays ? this.currentVille.pays.idPays : undefined!;
      });
  }

  updateVille() {
    this.currentVille.pays = this.paysList.find(p => p.idPays == this.updatedPaysId)!;
    this.villeService.updateVille(this.currentVille).subscribe(ville => {
      this.router.navigate(['villes']);
    });
  }
}
