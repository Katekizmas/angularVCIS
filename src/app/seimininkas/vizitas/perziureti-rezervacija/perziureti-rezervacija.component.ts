import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Vizitas } from '../vizitas.model';

@Component({
  selector: 'app-perziureti-rezervacija',
  templateUrl: './perziureti-rezervacija.component.html',
  styleUrls: ['./perziureti-rezervacija.component.sass']
})
export class PerziuretiRezervacijaComponent implements OnInit {
  vizitas: Vizitas; formosAntraste;
  constructor(
    public dialogRef: MatDialogRef<PerziuretiRezervacijaComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
  ) {
    this.vizitas = duomenys.vizitas;
    //this.formosAntraste = duomenys.antraste;
   }

  ngOnInit(): void {
  }

}
