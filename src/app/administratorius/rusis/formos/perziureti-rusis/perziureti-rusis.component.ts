import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";

import { Rusis } from "../../rusis.model";
import { RusisService } from "../../rusis.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-perziureti-rusis",
  templateUrl: "./perziureti-rusis.component.html",
  styleUrls: ["./perziureti-rusis.component.sass"],
})
export class PerziuretiRusisComponent {
  veiksmas: string;
  formosAntraste: string;
  pradineRusis;
  rusisForma: FormGroup;
  rusis: Rusis;

  constructor(
    public dialogRef: MatDialogRef<PerziuretiRusisComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public rusisService: RusisService,
    private fb: FormBuilder
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    this.formosAntraste = duomenys.rusis.pavadinimas;
    this.rusis = duomenys.rusis;
    this.rusisForma = this.sukurtiForma();
  }

  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_rusis: [this.rusis.id_rusis],
      pavadinimas: [this.rusis.pavadinimas, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  issaugoti(): void {
    this.rusis = this.rusisForma.getRawValue();
    this.rusisService.updateRusi(this.rusis);
    this.dialogRef.close(1);
  }
  istrinti(): void {
    this.rusis = this.rusisForma.getRawValue();
    Swal.fire({
      title: "Ištrinti rūšį?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, ištrinti rūšį!",
      cancelButtonText: "Uždaryti",
    }).then((result) => {
      if (result.isConfirmed) {
        this.rusisService.deleteRusi(this.rusis.id_rusis);
        this.dialogRef.close(2);
      }
    });
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }
}
