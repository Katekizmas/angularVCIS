import { formatDate } from "@angular/common";
export class Vizitas {
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

  constructor(vizitas) {
    {
      this.vardas = vizitas.vardas || "";
      this.pavarde = vizitas.pavarde || "";
      this.telnr = vizitas.telnr || "";
      this.pastas = vizitas.pastas || "";
      this.paslaugapavadinimas = vizitas.paslaugapavadinimas || "";
      this.gyvunasvardas = vizitas.gyvunasvardas || "";
      this.gyvunascipas = vizitas.gyvunascipas || "";
      this.id_vizitas = vizitas.id_vizitas || "";
      this.vizitasdiena = vizitas.vizitasdiena || "";
      this.vizitaspradzia = vizitas.vizitaspradzia || "";
      this.vizitaspabaiga = vizitas.vizitaspabaiga || "";
      this.vizitasbusena = vizitas.vizitasbusena || "";
      this.vizitaspastabos = vizitas.vizitaspastabos || "";
    }
  }
}
