export class Specialistas {
  id_specialistas: number;
  darbuotojas: number;
  vardas: string;
  pavarde: string;
  telnr: string;
  pastas: string;
  pareigos: string;
  darbolaikasnuo: string;
  darbolaikasiki: string;
  pastabos: string;
  constructor(specialistas) {
    {
      this.id_specialistas = specialistas.id_specialistas || "";
      this.darbuotojas = specialistas.darbuotojas || "";
      this.vardas = specialistas.vardas || "";
      this.pavarde = specialistas.pavarde || "";
      this.telnr = specialistas.telnr || "";
      this.pastas = specialistas.pastas || "";
      this.pareigos = specialistas.pareigos || "";
      this.darbolaikasnuo = specialistas.darbolaikasnuo || "";
      this.darbolaikasiki = specialistas.darbolaikasiki || "";
      this.pastabos = specialistas.pastabos || "";
    }
  }
}
