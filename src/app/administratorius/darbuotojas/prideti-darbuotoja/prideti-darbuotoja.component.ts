import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, ChangeDetectorRef } from "@angular/core";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Specialistas } from "../specialistas.model";
import { SpecialistasService } from "../specialistas.service";
import { PaslaugaDarbuotojo } from "../paslauga-darbuotojo.model";
import { PaslaugaDarbuotojoService } from "../paslauga-darbuotojo.service";

@Component({
  selector: "app-prideti-darbuotoja",
  templateUrl: "./prideti-darbuotoja.component.html",
  styleUrls: ["./prideti-darbuotoja.component.sass"],
})
export class PridetiDarbuotojaComponent {
  laikas = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
  paslaugos: PaslaugaDarbuotojo[];
  seimininkai: Specialistas[];
  veiksmas: string;
  formosAntraste: string;
  specialistasForma: FormGroup;
  specialistas: Specialistas;
  constructor(
    public dialogRef: MatDialogRef<PridetiDarbuotojaComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public specialistasService: SpecialistasService,
    public paslaugaDarbuotojoService: PaslaugaDarbuotojoService,
    private fb: FormBuilder,
    public cdRef: ChangeDetectorRef
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    this.specialistasService
      .getNedirbanciusSeimininkus()
      .subscribe((rezultatai) => {
        this.seimininkai = rezultatai;
      });
    this.paslaugaDarbuotojoService
      .getDarbuotojoPaslaugas(0)
      .subscribe((rezultatai) => {
        this.paslaugos = rezultatai;
      });

    if (this.veiksmas === "prideti") {
      this.formosAntraste = "Naujas Darbuotojas";
      this.specialistas = new Specialistas({});
      this.specialistas;
    }
    this.specialistasForma = this.sukurtiForma();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_specialistas: [this.specialistas.id_specialistas],
      darbuotojas: [this.specialistas.darbuotojas, [Validators.required]],
      /*vardas: [this.specialistas.vardas],
      pavarde: [this.specialistas.pavarde],
      pastas: [this.specialistas.pastas],
      telnr: [this.specialistas.telnr],*/
      pareigos: [this.specialistas.pareigos, [Validators.required]],
      darbolaikasiki: [this.specialistas.darbolaikasiki, [Validators.required]],
      darbolaikasnuo: [this.specialistas.darbolaikasnuo, [Validators.required]],
      pastabos: [this.specialistas.pastabos],
    });
  }
  submit() {
    // emppty stuff
  }
  async issaugoti() {
    this.specialistas.darbuotojas =
      this.specialistasForma.getRawValue().darbuotojas;
    this.specialistas.pareigos = this.specialistasForma.getRawValue().pareigos;
    this.specialistas.darbolaikasiki =
      this.specialistasForma.getRawValue().darbolaikasiki;
    this.specialistas.darbolaikasnuo =
      this.specialistasForma.getRawValue().darbolaikasnuo;
    this.specialistas.pastabos = this.specialistasForma.getRawValue().pastabos;
    var paslaugosSukurti: PaslaugaDarbuotojo[] = [];
    for (let i = 0; i < this.paslaugos.length; i++)
      if (this.paslaugos[i].pakeistas) paslaugosSukurti.push(this.paslaugos[i]);

    this.specialistasService.addSpecialista(
      this.specialistas,
      paslaugosSukurti
    );
  }
  atsaukti(): void {
    this.dialogRef.close();
  }
  SeimininkoID(eilute) {
    this.specialistas.darbuotojas = eilute.darbuotojas;
    this.specialistas.vardas = eilute.vardas;
    this.specialistas.pavarde = eilute.pavarde;
    this.specialistas.pastas = eilute.pastas;
    this.specialistas.telnr = eilute.telnr;
  }

  paslaugaPaspausta(indeksas) {
    if (this.paslaugos[indeksas].pakeistas)
      this.paslaugos[indeksas].pakeistas = false;
    else this.paslaugos[indeksas].pakeistas = true;
  }
}
