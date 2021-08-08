import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { PamirstasSlaptazodisComponent } from "../pamirstas-slaptazodis/pamirstas-slaptazodis.component";
@Component({
  selector: "app-registracija",
  templateUrl: "./registracija.component.html",
  styleUrls: ["./registracija.component.scss"],
})
export class RegistracijaComponent implements OnInit {
  private readonly API_NUORODA = `${environment.apiUrl}/autentifikacija`;

  klaida = "";
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      vardas: ["", Validators.required],
      pavarde: ["", Validators.required],
      telnr: [
        "+370",
        [Validators.required, Validators.pattern("^[0-9-+]{9,12}$")],
      ],
      pastas: [
        "",
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      slaptazodis: ["", Validators.required],
      cslaptazodis: ["", Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.klaida = "";
    if (
      this.authForm.get("slaptazodis").value ==
      this.authForm.get("cslaptazodis").value
    ) {
      var vartotojas = {
        vardas: this.f.vardas.value,
        pavarde: this.f.pavarde.value,
        pastas: this.f.pastas.value,
        telnr: this.f.telnr.value,
        slaptazodis: this.f.slaptazodis.value,
      };
      ////////////////////////////
      this.httpClient
        .post<any>(this.API_NUORODA + "/registruoti", vartotojas)
        .subscribe((atsakymas) => {
          if (atsakymas["kodas"] == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: atsakymas["pranesimas"], //"Vartotojas sėkmingai sukurtas!",
              showConfirmButton: false,
              timer: 3000,
            });
            this.submitted = true;
            // stop here if form is invalid
            if (this.authForm.invalid) {
              return;
            } else {
              //this.router.navigate(["/administratorius/skydelis"]);
              this.router.navigate(["/autentifikacija/prisijungimas"]);
            }
          } else {
            this.klaida = atsakymas["pranesimas"];
          }
        });
    } else {
      this.klaida = "Slaptažodžiai nesutampa";
    }
  }
}
