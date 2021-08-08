import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";

import { Paslauga } from "../../paslauga.model";
import { PaslaugaService } from "../../paslauga.service";

import Swal from "sweetalert2";
@Component({
  selector: "app-perziureti-paslauga",
  templateUrl: "./perziureti-paslauga.component.html",
  styleUrls: ["./perziureti-paslauga.component.sass"],
})
export class PerziuretiPaslaugaComponent {
  veiksmas: string;
  formosAntraste: string;
  pradineRusis;
  paslaugaForma: FormGroup;
  paslauga: Paslauga;

  constructor(
    public dialogRef: MatDialogRef<PerziuretiPaslaugaComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public paslaugaService: PaslaugaService,
    private fb: FormBuilder
  ) {
    //Uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    this.formosAntraste = duomenys.paslauga.pavadinimas;
    this.paslauga = duomenys.paslauga;
    this.paslaugaForma = this.sukurtiForma();
  }

  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_paslauga: [this.paslauga.id_paslauga],
      pavadinimas: [this.paslauga.pavadinimas, [Validators.required]],
      aprasymas: [this.paslauga.aprasymas, [Validators.required]],
      kaina: [this.paslauga.kaina, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  issaugoti(): void {
    this.paslauga = this.paslaugaForma.getRawValue();
    this.paslaugaService.updatePaslauga(this.paslauga);
    this.dialogRef.close(1);
  }
  istrinti(): void {
    this.paslauga = this.paslaugaForma.getRawValue();
    Swal.fire({
      title: "Ištrinti paslaugą?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, ištrinti paslaugą!",
      cancelButtonText: "Uždaryti",
    }).then((result) => {
      if (result.isConfirmed) {
        this.paslaugaService.deletePaslauga(this.paslauga.id_paslauga);
        this.dialogRef.close(2);
      }
    });
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }
}
