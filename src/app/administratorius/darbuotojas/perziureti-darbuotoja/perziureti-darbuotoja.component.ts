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

import { Specialistas } from "../specialistas.model";
import { SpecialistasService } from "../specialistas.service";
import { PaslaugaDarbuotojo } from "../paslauga-darbuotojo.model";
import { PaslaugaDarbuotojoService } from "../paslauga-darbuotojo.service";

@Component({
  selector: "app-perziureti-darbuotoja",
  templateUrl: "./perziureti-darbuotoja.component.html",
  styleUrls: ["./perziureti-darbuotoja.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerziuretiDarbuotojaComponent {
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
  veiksmas: string;
  formosAntraste: string;
  specialistasForma: FormGroup;
  specialistas: Specialistas;

  constructor(
    public dialogRef: MatDialogRef<PerziuretiDarbuotojaComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public specialistasService: SpecialistasService,
    public paslaugaDarbuotojoService: PaslaugaDarbuotojoService,
    private fb: FormBuilder,
    public cdRef: ChangeDetectorRef
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    this.paslaugaDarbuotojoService
      .getDarbuotojoPaslaugas(duomenys.specialistas.id_specialistas)
      .subscribe((rezultatai) => {
        this.paslaugos = rezultatai;
      });
    if (this.veiksmas === "redaguoti") {
      this.formosAntraste =
        duomenys.specialistas.vardas + " " + duomenys.specialistas.pavarde;
      this.specialistas = duomenys.specialistas;
    }
    this.specialistasForma = this.sukurtiForma();
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_specialistas: [this.specialistas.id_specialistas],
      vardas: [this.specialistas.vardas],
      pavarde: [this.specialistas.pavarde],
      pastas: [this.specialistas.pastas],
      telnr: [this.specialistas.telnr],
      pareigos: [this.specialistas.pareigos, [Validators.required]],
      darbolaikasiki: [this.specialistas.darbolaikasiki, [Validators.required]],
      darbolaikasnuo: [this.specialistas.darbolaikasnuo, [Validators.required]],
      pastabos: [this.specialistas.pastabos],
    });
  }
  submit() {
    // emppty stuff
  }
  issaugoti(): void {
    var paslaugosIstrinti: PaslaugaDarbuotojo[] = [];
    var paslaugosSukurti: PaslaugaDarbuotojo[] = [];
    for (let i = 0; i < this.paslaugos.length; i++) {
      if (this.paslaugos[i].pakeistas)
        if (this.paslaugos[i].priklauso)
          paslaugosIstrinti.push(this.paslaugos[i]);
        else paslaugosSukurti.push(this.paslaugos[i]);
    }
    if (paslaugosSukurti.length > 0) {
      this.paslaugaDarbuotojoService.addDarbuotojoPaslaugas(
        paslaugosSukurti,
        this.duomenys.specialistas.id_specialistas
      );
    }
    if (paslaugosIstrinti.length > 0) {
      this.paslaugaDarbuotojoService.deleteDarbuotojoPaslaugas(
        paslaugosIstrinti,
        this.duomenys.specialistas.id_specialistas
      );
    }

    this.specialistas = this.specialistasForma.getRawValue();
    this.specialistasService.updateSpecialista(this.specialistas);
  }
  istrinti(): void {
    Swal.fire({
      title: "Ar tikrai norite visam laikui ištrinti iš duomenų bazės?",
      text: "Jūs negalėsite atstatyti darbuotojo duomenų!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, ištrinti dabar!",
      cancelButtonText: "Atšaukti",
    }).then((result) => {
      if (result.value) {
        this.paslaugaDarbuotojoService.deleteDarbuotojoPaslaugas(
          this.paslaugos,
          this.duomenys.specialistas.id_specialistas
        );

        this.specialistasService.deleteSpecialista(
          this.duomenys.specialistas.id_specialistas
        );

        this.dialogRef.close(2);
      }
    });
  }
  atsaukti(): void {
    this.dialogRef.close();
  }

  paslaugaPaspausta(indeksas) {
    if (this.paslaugos[indeksas].pakeistas)
      this.paslaugos[indeksas].pakeistas = false;
    else this.paslaugos[indeksas].pakeistas = true;
  }
}
