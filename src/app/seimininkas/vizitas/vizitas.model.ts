export class Vizitas {
  id_vizitas: number;
  vardas: string;
  pavarde: string;
  telnr: string;
  pareigos: string;
  diena: string;
  pradzia: string;
  pabaiga: string;
  busena: string;
  pastabos: string;
  pavadinimas: string;
  gyvunas: string;
  patvirtintas: boolean;
  constructor(vizitas) {
    {
      this.id_vizitas = vizitas.id_vizitas || "0";
      this.vardas = vizitas.vardas || "Nenustatyta";
      this.pavarde = vizitas.pavarde || "Nenustatyta";
      this.telnr = vizitas.telnr || "Nenustatyta";
      this.pareigos = vizitas.pareigos || "Nenustatyta";
      this.diena = vizitas.diena || "";
      this.pradzia = vizitas.pradzia || "";
      this.pabaiga = vizitas.pabaiga || "";
      this.busena = vizitas.busena || "";
      this.pastabos = vizitas.pastabos || "";
      this.pavadinimas = vizitas.pavadinimas || "";
      this.gyvunas = vizitas.gyvunas || "";
      if (vizitas.busena == "Patvirtintas") this.patvirtintas = true;
      else this.patvirtintas = false;
    }
  }
}
