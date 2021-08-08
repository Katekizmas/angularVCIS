import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";

import { PerziuretiRezervacijaComponent } from "./perziureti-rezervacija/perziureti-rezervacija.component";
import { VizitasService } from "./vizitas.service";
import { Vizitas } from "./vizitas.model";

@Component({
  selector: "app-vizitas",
  templateUrl: "./vizitas.component.html",
  styleUrls: ["./vizitas.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class VizitasComponent implements OnInit {
  rodomiStulpeliaiVizitas = [
    "gyvunas",
    "paslauga",
    "diena",
    "laikas",
    "busena",
    //"veiksmai",
  ];
  duomenysVizitas: any | null;
  vizitai: Vizitas[] | null;
  /*vizitaiArtejantys: Vizitas[] | null;
  vizitaiIstorija: Vizitas[] | null;*/
  vizitaiArtejantys: any | null;
  vizitaiIstorija: any | null;
  indeksas: number;
  id: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public vizitasService: VizitasService,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild("vizitasArtejantysPaginator", { static: true })
  vizitasArtejantysPaginator: MatPaginator;
  @ViewChild("vizitasIstorijaPaginator", { static: true })
  vizitasIstorijaPaginator: MatPaginator;

  perziuretiVizitoDuomenis(eilute) {
    if (eilute.busena != "Nepatvirtintas") {
      const dialogRef = this.dialog.open(PerziuretiRezervacijaComponent, {
        data: {
          vizitas: eilute,
          //antraste: this.formosAntraste
        },
        //height: '500px',
        width: "600px",
      });
    } else {
      this.snackBar.open(
        "Peržiūra negalima, kol specialistas nepatvirtino vizito!",
        "",
        {
          duration: 3000,
          verticalPosition: "bottom",
          horizontalPosition: "center",
          panelClass: "black",
        }
      );
    }
  }
  ngAfterViewInit() {}
  ngOnInit() {
    this.uzkrautiDuomenis();
  }
  public uzkrautiDuomenis() {
    this.vizitasService.getVizitus().subscribe((rezultatai) => {
      this.vizitai = rezultatai;
      this.vizitaiArtejantys = new MatTableDataSource<Vizitas>(
        this.vizitai.filter(
          (x) => x.busena == "Patvirtintas" || x.busena == "Nepatvirtintas"
        )
      );
      this.vizitaiIstorija = new MatTableDataSource<Vizitas>(
        this.vizitai.filter(
          (x) => x.busena == "Atšauktas" || x.busena == "Atliktas"
        )
      );
      this.vizitaiArtejantys.paginator = this.vizitasArtejantysPaginator;
      this.vizitaiIstorija.paginator = this.vizitasIstorijaPaginator;
    });
  }
  atsauktiVizita(objektas, indeksas) {
    if (objektas.busena == "Nepatvirtintas") {
      Swal.fire({
        title: "Ar tikrai atšaukti rezervaciją?",
        text: "Jūs negalėsite atstatyti susitikimo duomenų!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Taip, atšaukti rezervaciją!",
        cancelButtonText: "Atšaukti",
      }).then((result) => {
        if (result.isConfirmed) {
          this.vizitaiArtejantys.data[indeksas].busena = "Atšauktas";
          this.vizitaiIstorija.data.push(this.vizitaiArtejantys.data[indeksas]);
          this.vizitaiArtejantys.data.splice(indeksas, 1);
          this.vizitaiArtejantys._updateChangeSubscription();
          this.vizitaiIstorija._updateChangeSubscription();
          this.vizitasService.atsauktiVizitas(objektas.id_vizitas);
          Swal.fire(
            "Rezervacija atšaukta!",
            "Specialistas informuotas apie atšaukimą.",
            "success"
          );
        }
      });
    }
  }
  atliekamasVeiksmas(elementas, indeksas) {
    if (elementas.busena === "Nepatvirtintas") {
      this.atsauktiVizita(elementas, indeksas);
    } else {
      this.perziuretiVizitoDuomenis(elementas);
    }
  }
  submit() {
    // emppty stuff
  }
}
