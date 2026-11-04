import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pays } from '../model/pays.model';

@Component({
  selector: 'app-update-pays',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-pays.html'
})
export class UpdatePays implements OnInit {
  @Input()
  pays!: Pays;

  @Input()
  ajout!: boolean;

  @Output()
  paysUpdated = new EventEmitter<Pays>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdatePays', this.pays);
  }

  savePays() {
    this.paysUpdated.emit(this.pays);
  }
}
