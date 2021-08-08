export class Rusis {
    id_rusis: number;
    pavadinimas: string;
    constructor(rusis) {
      {
        this.id_rusis = rusis.id_rusis || '0';
        this.pavadinimas = rusis.pavadinimas || '';
      }
    }
  }
  