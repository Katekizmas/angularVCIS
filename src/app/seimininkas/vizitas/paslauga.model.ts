export class Paslauga {
    id_paslauga: number;
    pavadinimas: string;
    aprasymas: string;
    kaina: string;
    constructor(paslauga) {
        {
          this.id_paslauga = paslauga.id_paslauga || '0';
          this.pavadinimas =  paslauga.pavadinimas || 'Nenustatytas';
          this.aprasymas = paslauga.aprasymas || 'Nenustatytas';
          this.kaina = paslauga.kaina || '0.0';
        }
      }
}
