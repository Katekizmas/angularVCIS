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

@Component({
  selector: "app-prideti-rusis",
  templateUrl: "./prideti-rusis.component.html",
  styleUrls: ["./prideti-rusis.component.sass"],
})
export class PridetiRusisComponent {
  veiksmas: string;
  formosAntraste: string;
  pradineRusis;
  rusisForma: FormGroup;
  rusis: Rusis;

  constructor(
    public dialogRef: MatDialogRef<PridetiRusisComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public rusisService: RusisService,
    private fb: FormBuilder
  ) {
    // uzkraunam pradines reiksmes
    this.veiksmas = duomenys.veiksmas;
    if (this.veiksmas === "prideti") {
      this.formosAntraste = "Nauja Rūšis";
      this.rusis = new Rusis({});
    }
    this.rusisForma = this.sukurtiForma();
  }

  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_rusis: [this.rusis.id_rusis],
      pavadinimas: [this.rusis.pavadinimas, [Validators.required]],
    });
  }

  issaugoti(): void {
    this.rusis = this.rusisForma.getRawValue();
    this.rusisService.addRusi(this.rusis);
  }
  atsaukti(): void {
    this.dialogRef.close();
  }
}
