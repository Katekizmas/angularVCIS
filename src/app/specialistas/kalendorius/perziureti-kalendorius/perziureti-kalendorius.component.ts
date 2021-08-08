import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, ChangeDetectorRef } from "@angular/core";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import Swal from "sweetalert2";

import { Kalendorius } from "../../kalendorius.model";
import { KalendoriusService } from "../../kalendorius.service";

@Component({
  selector: "app-perziureti-kalendorius",
  templateUrl: "./perziureti-kalendorius.component.html",
  styleUrls: ["./perziureti-kalendorius.component.sass"],
})
export class PerziuretiKalendoriusComponent {
  veiksmas: string;
  formosAntraste: string;
  kalendoriusForma: FormGroup;
  kalendorius: Kalendorius;

  constructor(
    public dialogRef: MatDialogRef<PerziuretiKalendoriusComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public kalendoriusService: KalendoriusService,
    private fb: FormBuilder,
    public cdRef: ChangeDetectorRef
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    this.formosAntraste =
      duomenys.kalendorius.vardas + " " + duomenys.kalendorius.pavarde;
    this.kalendorius = duomenys.kalendorius;
    this.kalendoriusForma = this.sukurtiForma();
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_vizitas: [this.kalendorius.id_vizitas],
      vardas: [this.kalendorius.vardas],
      vardaspavarde: [this.kalendorius.vardas + " " + this.kalendorius.pavarde],
      pavarde: [this.kalendorius.pavarde],
      pastas: [this.kalendorius.pastas],
      telnr: [this.kalendorius.telnr],
      paslaugapavadinimas: [this.kalendorius.paslaugapavadinimas],
      gyvunasvardas: [this.kalendorius.gyvunasvardas],
      gyvunascipas: [this.kalendorius.gyvunascipas],
      vizitasdiena: [this.kalendorius.vizitasdiena],
      vizitaspradzia: [this.kalendorius.vizitaspradzia],
      vizitaspradziapabaiga: [
        this.kalendorius.vizitaspradzia +
          " - " +
          this.kalendorius.vizitaspabaiga,
      ],
      vizitaspabaiga: [this.kalendorius.vizitaspabaiga],
      vizitasbusena: [this.kalendorius.vizitasbusena],
      vizitaspastabos: [this.kalendorius.vizitaspastabos],
      skiepaspavadinimas: [this.kalendorius.skiepaspavadinimas],
      istorijasvoris: [this.kalendorius.istorijasvoris],
      istorijasavijauta: [
        this.kalendorius.istorijasavijauta,
        [Validators.required],
      ],
      istorijanustatyta: [
        this.kalendorius.istorijanustatyta,
        [Validators.required],
      ],
      istorijakomentarai: [
        this.kalendorius.istorijakomentarai,
        [Validators.required],
      ],
      istorijapaskirtasgydymas: [
        this.kalendorius.istorijapaskirtasgydymas,
        [Validators.required],
      ],
    });
  }
  submit() {
    // emppty stuff
  }
  patvirtinti(): void {
    this.kalendorius = this.kalendoriusForma.getRawValue();
    this.kalendoriusService.formosDuomenys = this.kalendorius;
    Swal.fire({
      title: "Įvykdyti vizitą ir išsaugoti duomenis?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, išsaugoti vizito duomenis!",
      cancelButtonText: "Uždaryti",
    }).then((result) => {
      const kalendorius = {
        id_vizitas: this.kalendorius.id_vizitas,
        pavadinimas: this.kalendorius.skiepaspavadinimas,
        svoris: this.kalendorius.istorijasvoris,
        savijauta: this.kalendorius.istorijasavijauta,
        nustatyta: this.kalendorius.istorijanustatyta,
        komentarai: this.kalendorius.istorijakomentarai,
        paskirtasgydymas: this.kalendorius.istorijapaskirtasgydymas,
      };
      this.kalendoriusService.ivykdytiVizitaIstorija(kalendorius);
      if (kalendorius.pavadinimas) {
        this.kalendoriusService.ivykdytiVizitaSkiepas(kalendorius);
      }
      if (result.isConfirmed) {
        this.dialogRef.close(1);
      }
    });
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }
}
