import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { IstorijaService } from './istorija.service';
import { SkiepasService } from './skiepas.service';
import { Istorija } from './istorija.model';
import { Skiepas } from './skiepas.model';

import { PerziuretiIstorijaComponent } from './perziureti-istorija/perziureti-istorija.component';

@Component({
  selector: 'app-istorija-skiepas',
  templateUrl: './istorija-skiepas.component.html',
  styleUrls: ['./istorija-skiepas.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'lt-LT' }],
})

export class IstorijaSkiepasComponent implements OnInit {
  rodomiStulpeliaiIstorija = [
    "laikas",
    "nustatyta",
    "veiksmai",
  ];
  rodomiStulpeliaiSkiepas = [
    "laikas",
    "pavadinimas",
  ];
  duomenysIstorija: any; duomenysSkiepas: any;
  //duomenysSkiepas = new MatTableDataSource<Skiepas>(skiepai);
  veiksmas: string; formosAntraste: string; pradineRusis;
  skiepai: Skiepas[]; istorijos: Istorija[];

  constructor(
    public dialogRef: MatDialogRef<IstorijaSkiepasComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public skiepasService: SkiepasService,
    public istorijaService: IstorijaService,
    public dialog: MatDialog,
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    if (this.veiksmas === 'perziureti') {
      this.formosAntraste = duomenys.gyvunas.vardas;
      this.istorijaService.getIstorija(duomenys.gyvunas.id_gyvunas).subscribe(rezultatai => { 
        this.istorijos = rezultatai; 
        this.duomenysIstorija = new MatTableDataSource<Istorija>(this.istorijos);
        this.duomenysIstorija.paginator = this.istorijosPaginator;
      });
      this.skiepasService.getSkiepus(duomenys.gyvunas.id_gyvunas).subscribe(rezultatai => { 
        this.skiepai = rezultatai; 
        this.duomenysSkiepas = new MatTableDataSource<Skiepas>(this.skiepai);
        this.duomenysSkiepas.paginator = this.skiepaiPaginator;
      });
    }
    
  }
  @ViewChild('istorijosPaginator', { static: true }) istorijosPaginator: MatPaginator;
  @ViewChild('skiepaiPaginator', { static: true }) skiepaiPaginator: MatPaginator;
  perziuretiGyvunoIstorija(eilute){
    const dialogRef = this.dialog.open(PerziuretiIstorijaComponent, {
      data: {
        istorija: eilute,
        antraste: this.formosAntraste
      },
      //height: '500px',
      width: '600px',
    });
  }
  ngAfterViewInit(){
    
  }
  ngOnInit() {
    
  }
  submit() {
    // emppty stuff
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }
}
