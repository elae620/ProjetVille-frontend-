import { Pays } from './pays.model';

export class PaysWrapper {
  _embedded!: {
    pays?: Pays[];
    payses?: Pays[];
  };
}

export { PaysWrapper as PaysWrapped };
