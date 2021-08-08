import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";

import { Paslauga } from "../../paslauga.model";
import { PaslaugaService } from "../../paslauga.service";

@Component({
  selector: "app-prideti-paslauga",
  templateUrl: "./prideti-paslauga.component.html",
  styleUrls: ["./prideti-paslauga.component.sass"],
})
export class PridetiPaslaugaComponent {
  veiksmas: string;
  formosAntraste: string;
  pradineRusis;
  paslaugaForma: FormGroup;
  paslauga: Paslauga;

  constructor(
    public dialogRef: MatDialogRef<PridetiPaslaugaComponent>, // reikia?
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public paslaugaService: PaslaugaService,
    private fb: FormBuilder
  ) {
    // uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    if (this.veiksmas === "prideti") {
      this.formosAntraste = "Nauja Paslauga";
      this.paslauga = new Paslauga({});
    }
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

  issaugoti(): void {
    this.paslauga = this.paslaugaForma.getRawValue();
    this.paslaugaService.addPaslauga(this.paslauga);
  }
  atsaukti(): void {
    this.dialogRef.close();
  }
}
