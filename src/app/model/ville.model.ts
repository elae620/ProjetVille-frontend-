import { Pays } from './pays.model';

export class Ville {
  idVille!: number;
  nomVille!: string;
  superficie!: number;
  dateCreation!: Date;
  pays?: Pays;
}