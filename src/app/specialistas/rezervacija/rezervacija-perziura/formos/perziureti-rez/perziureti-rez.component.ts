import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, ChangeDetectorRef } from "@angular/core";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import Swal from "sweetalert2";

import { Kalendorius } from "../../../../kalendorius.model";

@Component({
  selector: "app-perziureti",
  templateUrl: "./perziureti-rez.component.html",
  styleUrls: ["./perziureti-rez.component.sass"],
})
export class PerziuretiRezComponent {
  veiksmas: string;
  formosAntraste: string;
  vizitasForma: FormGroup;
  vizitas: Kalendorius;

  constructor(
    public dialogRef: MatDialogRef<PerziuretiRezComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    private fb: FormBuilder,
    public cdRef: ChangeDetectorRef
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    this.formosAntraste =
      duomenys.vizitas.vardas + " " + duomenys.vizitas.pavarde;
    this.vizitas = duomenys.vizitas;
    this.vizitasForma = this.sukurtiForma();
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_vizitas: [this.vizitas.id_vizitas],
      vardas: [this.vizitas.vardas],
      vardaspavarde: [this.vizitas.vardas + " " + this.vizitas.pavarde],
      pavarde: [this.vizitas.pavarde],
      pastas: [this.vizitas.pastas],
      telnr: [this.vizitas.telnr],
      paslaugapavadinimas: [this.vizitas.paslaugapavadinimas],
      gyvunasvardas: [this.vizitas.gyvunasvardas],
      gyvunascipas: [this.vizitas.gyvunascipas],
      vizitasdiena: [this.vizitas.vizitasdiena],
      vizitaspradzia: [this.vizitas.vizitaspradzia],
      vizitaspradziapabaiga: [
        this.vizitas.vizitaspradzia + " - " + this.vizitas.vizitaspabaiga,
      ],
      vizitaspabaiga: [this.vizitas.vizitaspabaiga],
      vizitasbusena: [this.vizitas.vizitasbusena],
      vizitaspastabos: [this.vizitas.vizitaspastabos],
      skiepaspavadinimas: [this.vizitas.skiepaspavadinimas],
      istorijasvoris: [this.vizitas.istorijasvoris],
      istorijasavijauta: [this.vizitas.istorijasavijauta],
      istorijanustatyta: [this.vizitas.istorijanustatyta],
      istorijakomentarai: [this.vizitas.istorijakomentarai],
      istorijapaskirtasgydymas: [this.vizitas.istorijapaskirtasgydymas],
    });
  }
  submit() {
    // emppty stuff
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }
}
