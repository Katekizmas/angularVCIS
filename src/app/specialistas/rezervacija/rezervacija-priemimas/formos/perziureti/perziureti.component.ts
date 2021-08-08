import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { getMatIconFailedToSanitizeLiteralError } from "@angular/material/icon";
import Swal from "sweetalert2";

import { Vizitas } from "../../../../vizitas.model";
import { VizitasService } from "../../../../vizitas.service";

@Component({
  selector: "app-perziureti",
  templateUrl: "./perziureti.component.html",
  styleUrls: ["./perziureti.component.sass"],
})
export class PerziuretiComponent {
  laikas = [
    "07:00",
    "07:15",
    "07:30",
    "07:45",
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

  minDate = new Date();
  pasirinktaslaikas: string;
  veiksmas: string;
  formosAntraste: string;
  vizitasForma: FormGroup;
  vizitas: Vizitas;

  constructor(
    public dialogRef: MatDialogRef<PerziuretiComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public vizitasService: VizitasService,
    private fb: FormBuilder,
    public cdRef: ChangeDetectorRef
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    if (this.veiksmas === "redaguoti") {
      this.formosAntraste =
        duomenys.vizitas.vardas + " " + duomenys.vizitas.pavarde;
      this.vizitas = duomenys.vizitas;
    }
    this.vizitasForma = this.sukurtiForma();
    this.pasirinktaslaikas = this.vizitas.vizitaspradzia;
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_vizitas: [this.vizitas.id_vizitas],
      vardas: [this.vizitas.vardas + " " + this.vizitas.pavarde],
      pavarde: [this.vizitas.pavarde],
      pastas: [this.vizitas.pastas],
      telnr: [this.vizitas.telnr],
      paslaugapavadinimas: [
        this.vizitas.paslaugapavadinimas,
        [Validators.required],
      ],
      gyvunasvardas: [this.vizitas.gyvunasvardas, [Validators.required]],
      gyvunascipas: [this.vizitas.gyvunascipas, [Validators.required]],
      vizitasdiena: [this.vizitas.vizitasdiena, [Validators.required]],
      vizitaspradzia: [this.vizitas.vizitaspradzia, [Validators.required]],
      vizitaspabaiga: [this.vizitas.vizitaspabaiga, [Validators.required]],
      vizitasbusena: [this.vizitas.vizitasbusena, [Validators.required]],
      vizitaspastabos: [this.vizitas.vizitaspastabos, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  patvirtinti(): void {
    this.vizitas = this.vizitasForma.getRawValue();
    //this.vizitasService.updateSpecialista(this.vizitas);
    Swal.fire({
      title: "Patvirtinti vizitą?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, patvirtinti vizitą!",
      cancelButtonText: "Uždaryti",
    }).then((result) => {
      this.vizitas.vizitaspradzia = this.pasirinktaslaikas;
      this.vizitas.vizitasdiena = formatDate(
        this.vizitas.vizitasdiena,
        "yyyy-MM-dd",
        "en-US"
      );
      this.vizitasService.patvirtintiVizita(this.vizitas);
      if (result.isConfirmed) {
        Swal.fire(
          "Vizitas patvirtintas!",
          "Šeimininkas informuotas apie patvirtinimą.",
          "success"
        );
        this.dialogRef.close(2);
      }
    });
  }
  atsaukti(): void {
    this.vizitas = this.vizitasForma.getRawValue();
    Swal.fire({
      title: "Ar tikrai norite atšaukti vizitą?",
      //text: "Jūs negalėsite atstatyti vizito būsenos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, atšaukti vizitą!",
      cancelButtonText: "Uždaryti",
    }).then((result) => {
      this.vizitas.vizitaspradzia = this.pasirinktaslaikas;
      this.vizitas.vizitasdiena = formatDate(
        this.vizitas.vizitasdiena,
        "yyyy-MM-dd",
        "en-US"
      );
      this.vizitasService.atsauktiVizita(this.vizitas);
      if (result.isConfirmed) {
        Swal.fire(
          "Rezervacija atšaukta!",
          "Šeimininkas informuotas apie atšaukimą.",
          "success"
        );
        this.dialogRef.close(2);
      }
    });
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }

  paslaugaPaspausta(indeksas) {
    if (this.vizitas[indeksas].pakeistas)
      this.vizitas[indeksas].pakeistas = false;
    else this.vizitas[indeksas].pakeistas = true;
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  vizitoLaikas(laikas) {
    this.pasirinktaslaikas = laikas;
  }
}
