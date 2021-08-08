export class Skiepas {
    laikas: string;
    pavadinimas: string;
    constructor(skiepas) {
        {
          this.laikas = skiepas.laikas || '';
          this.pavadinimas = skiepas.pavadinimas || '';
        }
    }
  }
  