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
import Swal from "sweetalert2";

@Component({
  selector: "app-perziureti",
  templateUrl: "./perziureti.component.html",
  styleUrls: ["./perziureti.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "lt-LT" }],
})
export class PerziuretiComponent {
  veiksmas: string;
  formosAntraste: string;
  pradineRusis;
  gyvunasForma: FormGroup;
  gyvunas: Gyvunai;
  rusis: Rusis[];

  constructor(
    public dialogRef: MatDialogRef<PerziuretiComponent>,
    @Inject(MAT_DIALOG_DATA) public duomenys: any,
    public gyvunaiService: GyvunaiService,
    public rusisService: RusisService,
    private fb: FormBuilder
  ) {
    //Uzkraunam pradines reiksmes
    this.rusisService.getRusis().subscribe((rezultatai) => {
      this.rusis = rezultatai;
    });
    this.veiksmas = duomenys.veiksmas;
    this.formosAntraste = duomenys.gyvunas.vardas;
    this.gyvunas = duomenys.gyvunas;
    this.pradineRusis = this.gyvunas.fk_rusis;
    this.gyvunasForma = this.sukurtiForma();
  }

  sukurtiForma(): FormGroup {
    return this.fb.group({
      id_gyvunas: [this.gyvunas.id_gyvunas],
      fk_rusis: [this.gyvunas.fk_rusis],
      cipas: [this.gyvunas.cipas, [Validators.required]],
      gimimometai: [
        formatDate(this.gyvunas.gimimometai, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      lytis: [this.gyvunas.lytis, [Validators.required]],
      rusis: [this.gyvunas.rusis, [Validators.required]],
      veisle: [this.gyvunas.veisle, [Validators.required]],
      vardas: [this.gyvunas.vardas, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }

  rusiesID(id) {
    // grazina pasirinktos rusies id
    this.pradineRusis = id;
  }
  issaugoti(): void {
    this.gyvunas = this.gyvunasForma.getRawValue();
    this.gyvunas.gimimometai = formatDate(
      this.gyvunas.gimimometai,
      "yyyy-MM-dd",
      "en-US"
    );
    this.gyvunas.fk_rusis = this.pradineRusis;
    this.gyvunas.rusis = this.rusis.find(
      (x) => x.id_rusis == this.pradineRusis
    ).pavadinimas;
    this.gyvunaiService.updateGyvunas(this.gyvunas);
    this.dialogRef.close(1);
  }
  istrinti(): void {
    this.gyvunas = this.gyvunasForma.getRawValue();
    Swal.fire({
      title: "Ištrinti gyvūną?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Taip, ištrinti gyvūną!",
      cancelButtonText: "Uždaryti",
    }).then((result) => {
      if (result.isConfirmed) {
        this.gyvunaiService.deleteGyvunas(this.gyvunas.id_gyvunas);
        this.dialogRef.close(2);
      }
    });
  }
  uzdaryti(): void {
    this.dialogRef.close();
  }
}
