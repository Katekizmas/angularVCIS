export class Istorija {
  laikas: string;
  svoris: string;
  savijauta: string;
  nustatyta: string;
  komentarai: string;
  paskirtasgydymas: string;
  pareigos: string;
  vardas: string;
  pavarde: string;
  constructor(istorija) {
      {
        this.laikas = istorija.laikas || '';
        this.svoris = istorija.svoris || '';
        this.savijauta = istorija.savijauta || '';
        this.nustatyta = istorija.nustatyta || '';
        this.komentarai = istorija.komentarai || '';
        this.paskirtasgydymas = istorija.paskirtasgydymas || '';
        this.pareigos = istorija.pareigos || '';
        this.pavarde = istorija.pavarde || '';
      }
  }
}
