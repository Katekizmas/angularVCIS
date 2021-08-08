import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { PaslaugaService } from "../paslauga.service";
import { Paslauga } from "../paslauga.model";
import { GyvunaiService } from "../../gyvunai/gyvunai.service";
import { Gyvunai } from "../../gyvunai/gyvunai.model";
import { VizitasService } from "../vizitas.service";
import { now } from "moment";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-rezervacija",
  templateUrl: "./rezervacija.component.html",
  styleUrls: ["./rezervacija.component.sass"],
})
export class RezervacijaComponent implements OnInit {
  laikas = [
    "07:00",
    "07:15",
    "07:30",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
  ];
  pasirinktaslaikas: string;
  minDate = new Date();
  paslaugos: Paslauga[];
  gyvunai: Gyvunai[];
  /*paslaugaPasirinkta = new Paslauga({});
  gyvunaiPasirinkta = new Gyvunai({});*/
  paslaugaPasirinkta: Paslauga;
  gyvunaiPasirinkta: Gyvunai;
  rezervuoti: FormGroup;
  constructor(
    private fb: FormBuilder,
    public paslaugaService: PaslaugaService,
    public gyvunaiService: GyvunaiService,
    public vizitasService: VizitasService
  ) {
    this.paslaugaService.getPaslaugas().subscribe((rezultatai) => {
      this.paslaugos = rezultatai;
    });
    this.gyvunaiService.getGyvunusObservable().subscribe((rezultatai) => {
      this.gyvunai = rezultatai;
    });
    this.initForm();
  }
  ngOnInit(): void {}
  initForm() {
    this.rezervuoti = this.fb.group({
      paslauga: [
        "",
        [Validators.required /*, Validators.pattern("[a-zA-Z]+")*/],
      ],
      gyvunas: ["", [Validators.required]],
      data: [new Date(), [Validators.required]],
      laikas: ["", [Validators.required]],
      aprasymas: ["", [Validators.required]],
      sutinka: [false, [Validators.requiredTrue]],
    });
  }
  rezervuotiApsilankyma() {
    this.vizitasService.getVykdomuVizituSkaiciu().subscribe((rezultatai) => {
      //rezultatai[0].skaicius
    });
    if (
      this.rezervuoti.value.paslauga &&
      this.rezervuoti.value.gyvunas &&
      this.rezervuoti.value.data &&
      this.rezervuoti.value.laikas &&
      this.rezervuoti.value.aprasymas &&
      this.rezervuoti.value.sutinka
    ) {
      this.vizitasService.getVykdomuVizituSkaiciu().subscribe((rezultatai) => {
        this.rezervuoti.value.data = formatDate(
          this.rezervuoti.value.data,
          "yyyy-MM-dd",
          "en-US"
        );
        if (rezultatai[0].skaicius == 0) {
          Swal.fire({
            icon: "success",
            title: "Sėkmingai užrezervavote vietą",
            showConfirmButton: false,
            timer: 2500,
          });
          this.vizitasService.addVizitas(this.rezervuoti.value);
          this.rezervuoti.reset();
          Object.keys(this.rezervuoti.controls).forEach((key) => {
            this.rezervuoti.get(key).setErrors(null);
          });
          this.paslaugaPasirinkta = new Paslauga({});
          this.gyvunaiPasirinkta = new Gyvunai({});
        } else if (rezultatai[0].skaicius > 0) {
          Swal.fire({
            icon: "error",
            title:
              "Jus jau ęsate užsiregistravę, palaukite kol jūsų rezervacija patvirtins specialistas!",
            showConfirmButton: true,
          });
          this.rezervuoti.reset();
          Object.keys(this.rezervuoti.controls).forEach((key) => {
            this.rezervuoti.get(key).setErrors(null);
          });
          this.paslaugaPasirinkta = new Paslauga({});
          this.gyvunaiPasirinkta = new Gyvunai({});
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Užpildykite visus reikiamus laukus!",
        showConfirmButton: true,
      });
    }
  }
  paslaugaPaspausta(id) {
    this.paslaugaPasirinkta = this.paslaugos.find((x) => x.id_paslauga == id);
  }
  gyvunaiPaspausta(id) {
    this.gyvunaiPasirinkta = this.gyvunai.find((x) => x.id_gyvunas == id);
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  vizitoLaikas(laikas) {
    this.rezervuoti.value.laikas = this.pasirinktaslaikas;
  }
}
