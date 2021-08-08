export class Paslauga {
    id_paslauga: number;
    pavadinimas: string;
    aprasymas: string;
    kaina: string;
    constructor(paslauga) {
        {
          this.id_paslauga = paslauga.id_paslauga || '';
          this.pavadinimas =  paslauga.pavadinimas || '';
          this.aprasymas = paslauga.aprasymas || '';
          this.kaina = paslauga.kaina || '';
        }
      }
}
