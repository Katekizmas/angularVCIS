import { formatDate } from '@angular/common';
export class Gyvunai {
  //img: string;
  id_gyvunas: number;
  fk_rusis: number;
  cipas: string;
  lytis: string;
  veisle: string;
  gimimometai: string;
  rusis: string;
  vardas: string;
  constructor(gyvunas) {
    {
      this.id_gyvunas = gyvunas.id_gyvunas || '0';
      this.fk_rusis =  gyvunas.fk_rusis || '1';
      this.cipas = gyvunas.cipas || 'NĖRA';
      this.gimimometai = gyvunas.gimimometai || '2000-01-01';
      this.lytis = gyvunas.lytis || '';
      this.rusis = gyvunas.rusis || '';
      this.veisle = gyvunas.veisle || '';
      this.vardas = gyvunas.vardas || '';
    }
  }
}
