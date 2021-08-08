import { formatDate } from "@angular/common";
export class Kalendorius {
  vardas: string;
  pavarde: string;
  telnr: string;
  pastas: string;
  paslaugapavadinimas: string;
  gyvunasvardas: string;
  gyvunascipas: string;
  id_vizitas: number;
  vizitasdiena: string;
  vizitaspradzia: string;
  vizitaspabaiga: string;
  vizitasbusena: string;
  vizitaspastabos: string;
  skiepaspavadinimas: string;
  istorijasvoris: string;
  istorijasavijauta: string;
  istorijanustatyta: string;
  istorijapaskirtasgydymas: string;
  istorijakomentarai: string;

  constructor(kalendorius) {
    {
      this.vardas = kalendorius.vardas || "";
      this.pavarde = kalendorius.pavarde || "";
      this.telnr = kalendorius.telnr || "";
      this.paslaugapavadinimas = kalendorius.paslaugapavadinimas || "";
      this.gyvunasvardas = kalendorius.gyvunasvardas || "";
      this.gyvunascipas = kalendorius.gyvunascipas || "";
      this.id_vizitas = kalendorius.id_vizitas || "";
      this.vizitasdiena = kalendorius.vizitasdiena || "";
      this.vizitaspradzia = kalendorius.vizitaspradzia || "";
      this.vizitaspabaiga = kalendorius.vizitaspabaiga || "";
      this.vizitasbusena = kalendorius.vizitasbusena || "";
      this.vizitaspastabos = kalendorius.vizitaspastabos || "";
      this.skiepaspavadinimas = kalendorius.skiepaspavadinimas || "";
      this.istorijasvoris = kalendorius.istorijasvoris || "";
      this.istorijasavijauta = kalendorius.istorijasavijauta || "";
      this.istorijanustatyta = kalendorius.istorijanustatyta || "";
      this.istorijapaskirtasgydymas =
        kalendorius.istorijapaskirtasgydymas || "";
      this.istorijakomentarai = kalendorius.istorijakomentarai || "";
    }
  }
}
