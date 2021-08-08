import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  BehaviorSubject,
  fromEvent,
  fromEventPattern,
  merge,
  Observable,
} from "rxjs";
import { map } from "rxjs/operators";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { SelectionModel } from "@angular/cdk/collections";

import { PaslaugaService } from "./paslauga.service";
import { Paslauga } from "./paslauga.model";
import { PridetiPaslaugaComponent } from "./formos/prideti-paslauga/prideti-paslauga.component";
import { PerziuretiPaslaugaComponent } from "./formos/perziureti-paslauga/perziureti-paslauga.component";

@Component({
  selector: "app-paslauga",
  templateUrl: "./paslauga.component.html",
  styleUrls: ["./paslauga.component.sass"],
})
export class PaslaugaComponent implements OnInit {
  rodomiStulpeliai = [
    //"id_gyvunas",
    "pavadinimas",
    "kaina",
  ];
  duomenuBaze: PaslaugaService | null;
  gautiDuomenys: DuomenuSaltinis | null;
  indeksas: number;
  id: number;
  paslaugos: Paslauga | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public paslaugaService: PaslaugaService,
    private snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit() {
    this.uzkrautiDuomenis();
  }
  atnaujinti() {
    this.uzkrautiDuomenis();
  }

  pridetiDuomenis() {
    const dialogRef = this.dialog.open(PridetiPaslaugaComponent, {
      data: {
        paslauga: this.paslaugos,
        veiksmas: "prideti",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.duomenuBaze.duomenuKeitimas.value.unshift(
          this.paslaugaService.getFormosDuomenis()
        );
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-success",
          "Sėkmingai pridėjote paslaugą",
          "bottom",
          "center"
        );
      }
    });
  }
  redaguotiDuomenis(eilute) {
    this.id = eilute.id_paslauga;
    const dialogRef = this.dialog.open(PerziuretiPaslaugaComponent, {
      data: {
        paslauga: eilute,
        veiksmas: "redaguoti",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_paslauga === this.id
        );
        // Then you update that record using data from formosDuomenys (values you entered)
        this.duomenuBaze.duomenuKeitimas.value[foundIndex] =
          this.paslaugaService.getFormosDuomenis();
        // And lastly refresh table
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "black",
          "Sėkmingai pakoregavote paslaugos duomenis",
          "bottom",
          "center"
        );
      } else if (result === 2) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_paslauga === this.id
        );
        this.duomenuBaze.duomenuKeitimas.value.splice(foundIndex, 1);
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-danger",
          "Sėkmingai ištrynėte paslaugą",
          "bottom",
          "center"
        );
      }
    });
  }
  /*istrintiDuomenis(eilute, i: number) {
    this.indeksas = i;
    this.id = eilute.id_gyvunas;
    const dialogRef = this.dialog.open(IstrintiPaslaugaComponent, {
      data: eilute,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_paslauga === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.duomenuBaze.duomenuKeitimas.value.splice(foundIndex, 1);
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-danger",
          "Sėkmingai ištrynėte paslaugą",
          "bottom",
          "center"
        );
      }
    });
  }*/
  private atnaujintiLentele() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public uzkrautiDuomenis() {
    this.duomenuBaze = new PaslaugaService(this.httpClient);
    this.gautiDuomenys = new DuomenuSaltinis(
      this.duomenuBaze,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, "keyup").subscribe(() => {
      if (!this.gautiDuomenys) {
        return;
      }
      this.gautiDuomenys.filter = this.filter.nativeElement.value;
    });
  }
  rodytiPranesima(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

export class DuomenuSaltinis extends DataSource<Paslauga> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  paieskosDuomenys: Paslauga[] = [];
  uzkrautiDuomenys: Paslauga[] = [];
  constructor(
    public duomenuBaze: PaslaugaService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Paslauga[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.duomenuBaze.duomenuKeitimas,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.duomenuBaze.getPaslaugas();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.paieskosDuomenys = this.duomenuBaze.duomenys
          .slice()
          .filter((paslauga: Paslauga) => {
            const paieskosTekstas = (
              paslauga.pavadinimas + paslauga.kaina
            ).toLowerCase();

            return paieskosTekstas.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.paieskosDuomenys.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.uzkrautiDuomenys = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.uzkrautiDuomenys;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(duomenys: Paslauga[]): Paslauga[] {
    if (!this._sort.active || this._sort.direction === "") {
      return duomenys;
    }
    return duomenys.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "pavadinimas":
          [propertyA, propertyB] = [a.pavadinimas, b.pavadinimas];
          break;
        case "kaina":
          [propertyA, propertyB] = [a.kaina, b.kaina];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
