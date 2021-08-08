export class Zinute {
  vardas: string;
  pavarde: string;
  telnr: string;
  id_vizitas: number;
  fk_seimininkas: number;
  fk_specialistas: number;

  zinute: string;
  laikas: string;
  fk_siuntejas: string;
  fk_gavejas: string;

  constructor(zinutes) {
    {
      this.vardas = zinutes.vardas || "";
      this.pavarde = zinutes.pavarde || "";
      this.telnr = zinutes.telnr || "";
      this.id_vizitas = zinutes.id_vizitas || "";
      this.fk_seimininkas = zinutes.fk_seimininkas || "";
      this.zinute = zinutes.zinute || "";
      this.laikas = zinutes.laikas || "";
      this.fk_siuntejas = zinutes.fk_siuntejas || "";
      this.fk_gavejas = zinutes.fk_gavejas || "";
    }
  }
}
