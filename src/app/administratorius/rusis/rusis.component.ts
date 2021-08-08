import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { RusisService } from "./rusis.service";
import { Rusis } from "./rusis.model";
import { PridetiRusisComponent } from "./formos/prideti-rusis/prideti-rusis.component";
import { PerziuretiRusisComponent } from "./formos/perziureti-rusis/perziureti-rusis.component";

@Component({
  selector: "app-rusis",
  templateUrl: "./rusis.component.html",
  styleUrls: ["./rusis.component.sass"],
})
export class RusisComponent implements OnInit {
  rodomiStulpeliai = ["pavadinimas"];
  duomenuBaze: RusisService | null;
  gautiDuomenys: DuomenuSaltinis | null;
  indeksas: number;
  id: number;
  rusys: Rusis | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public rusisService: RusisService,
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
    const dialogRef = this.dialog.open(PridetiRusisComponent, {
      data: {
        rusis: this.rusys,
        veiksmas: "prideti",
      },
      //height: "270px",
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.duomenuBaze.duomenuKeitimas.value.unshift(
          this.rusisService.getFormosDuomenis()
        );
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-success",
          "Sėkmingai pridėjote rūšį",
          "bottom",
          "center"
        );
      }
    });
  }
  redaguotiDuomenis(eilute) {
    this.id = eilute.id_rusis;
    const dialogRef = this.dialog.open(PerziuretiRusisComponent, {
      data: {
        rusis: eilute,
        veiksmas: "redaguoti",
      },
      //height: "300px",
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_rusis === this.id
        );
        this.duomenuBaze.duomenuKeitimas.value[foundIndex] =
          this.rusisService.getFormosDuomenis();
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "black",
          "Sėkmingai pakoregavote rūšies duomenis",
          "bottom",
          "center"
        );
      } else if (result === 2) {
        const foundIndex = this.duomenuBaze.duomenuKeitimas.value.findIndex(
          (x) => x.id_rusis === this.id
        );
        this.duomenuBaze.duomenuKeitimas.value.splice(foundIndex, 1);
        this.atnaujintiLentele();
        this.rodytiPranesima(
          "snackbar-danger",
          "Sėkmingai ištrynėte rūšį",
          "bottom",
          "center"
        );
      }
    });
  }
  private atnaujintiLentele() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  public uzkrautiDuomenis() {
    this.duomenuBaze = new RusisService(this.httpClient);
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

export class DuomenuSaltinis extends DataSource<Rusis> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  paieskosDuomenys: Rusis[] = [];
  uzkrautiDuomenys: Rusis[] = [];
  constructor(
    public duomenuBaze: RusisService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Rusis[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.duomenuBaze.duomenuKeitimas,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.duomenuBaze.getRusis();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.paieskosDuomenys = this.duomenuBaze.duomenys
          .slice()
          .filter((paslauga: Rusis) => {
            const paieskosTekstas = paslauga.pavadinimas.toLowerCase();

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
  sortData(duomenys: Rusis[]): Rusis[] {
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
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
