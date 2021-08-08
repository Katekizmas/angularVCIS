export class PaslaugaDarbuotojo {
  id_paslauga: number;
  pavadinimas: string;
  priklauso: boolean;
  pakeistas: boolean;
  constructor(paslauga) {
    {
      this.id_paslauga = paslauga.id_paslauga || "";
      this.pavadinimas = paslauga.pavadinimas || "";
      this.priklauso = paslauga.priklauso || false;
      this.pakeistas = false;
    }
  }
}
