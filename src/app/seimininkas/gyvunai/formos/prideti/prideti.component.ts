import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { GyvunaiService } from "../../gyvunai.service";
import { RusisService } from "../../rusis.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Gyvunai } from "../../gyvunai.model";
import { Rusis } from "../../rusis.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
//import { DataSource } from "@angular/cdk/collections";
//import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-prideti",
  templateUrl: "./prideti.component.html",
  styleUrls: ["./prideti.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "lt-LT" }],
})
export class PridetiComponent {
  veiksmas: string;
  formosAntraste: string;
  pradineRusis;
  gyvunasForma: FormGroup;
  gyvunas: Gyvunai;
  rusis: Rusis[];
  constructor(
    public dialogRef: MatDialogRef<PridetiComponent>, // reikia?
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public gyvunaiService: GyvunaiService,
    public rusisService: RusisService,
    private fb: FormBuilder
  ) {
    // uzkraunam pradines reiksmes
    this.rusisService.getRusis().subscribe((rezultatai) => {
      this.rusis = rezultatai;
    });
    this.veiksmas = duomenys.veiksmas;
    if (this.veiksmas === "prideti") {
      this.formosAntraste = "Naujas Gyvūnas";
      this.gyvunas = new Gyvunai({});
    }
    this.gyvunasForma = this.sukurtiForma();
  }
  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_gyvunas: [this.gyvunas.id_gyvunas],
      fk_rusis: [this.gyvunas.fk_rusis],
      cipas: [this.gyvunas.cipas],
      gimimometai: [
        formatDate(new Date(), "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      lytis: [this.gyvunas.lytis || "Nežinoma", [Validators.required]],
      veisle: [this.gyvunas.veisle, [Validators.required]],
      rusis: [this.gyvunas.rusis, [Validators.required]],
      vardas: [this.gyvunas.vardas, [Validators.required]],
    });
  }

  rusiesID(id) {
    // grazina pasirinktos rusies id
    this.pradineRusis = id;
  }
  issaugoti(): void {
    this.gyvunas = this.gyvunasForma.getRawValue();
    if (this.pradineRusis != null) {
      this.gyvunas.gimimometai = formatDate(
        this.gyvunas.gimimometai,
        "yyyy-MM-dd",
        "en-US"
      );
      // turetu buti geresnis sprendimas..
      this.gyvunas.fk_rusis = this.pradineRusis;
      this.gyvunas.rusis = this.rusis.find(
        (x) => x.id_rusis == this.pradineRusis
      ).pavadinimas;
    }
    this.gyvunaiService.addGyvunas(this.gyvunas); // prideti gyvuna
  }
  atsaukti(): void {
    this.dialogRef.close();
  }
}
