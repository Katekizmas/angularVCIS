import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Istorija } from '../istorija.model';

@Component({
  selector: 'app-perziureti-istorija',
  templateUrl: './perziureti-istorija.component.html',
  styleUrls: ['./perziureti-istorija.component.sass']
})
export class PerziuretiIstorijaComponent implements OnInit {
  istorija: Istorija; formosAntraste;
  constructor(
    public dialogRef: MatDialogRef<PerziuretiIstorijaComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
  ) {
    this.istorija = duomenys.istorija;
    this.formosAntraste = duomenys.antraste;
   }

  ngOnInit(): void {
  }

}
