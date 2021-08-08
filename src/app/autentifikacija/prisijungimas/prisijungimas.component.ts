import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";

@Component({
  selector: "app-prisijungimas",
  templateUrl: "./prisijungimas.component.html",
  styleUrls: ["./prisijungimas.component.scss"],
})
export class PrisijungimasComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  klaida = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.haveCookie();
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      pastas: ["adminas@adminas.lt", Validators.required],
      slaptazodis: ["adminas123", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("pastas").setValue("adminas@adminas.lt");
    this.authForm.get("slaptazodis").setValue("adminas123");
  }
  doctorSet() {
    this.authForm.get("pastas").setValue("specialistas@specialistas.lt");
    this.authForm.get("slaptazodis").setValue("specialistas123");
  }
  patientSet() {
    this.authForm.get("pastas").setValue("seimininkas@seimininkas.lt");
    this.authForm.get("slaptazodis").setValue("seimininkas123");
  }
  haveCookie() {
    this.authService.checkCookie().subscribe(
      (res) => {
        if (res) {
          const role = this.authService.currentUserValue.role;
          if (role === Role.All || role === Role.Admin) {
            this.router.navigate(["/administratorius/skydelis"]);
          } else if (role === Role.Doctor) {
            this.router.navigate(["/specialistas/skydelis"]);
          } else if (role === Role.Patient) {
            this.router.navigate(["/seimininkas/skydelis"]);
          } else {
            this.router.navigate(["/autentifikacija/prisijungimas"]);
          }
        } else {
          this.router.navigate(["/autentifikacija/prisijungimas"]);
          this.klaida = "Prisijungimas negalimas";
        }
      } /*,
      (klaida) => {
        this.klaida = klaida;
        this.submitted = false;
      }*/
    );
  }
  onSubmit() {
    this.submitted = true;
    this.klaida = "";
    if (this.authForm.invalid) {
      this.klaida = "Paštas arba slaptažodis neatitinka reikalavimų!";
      return;
    } else {
      this.authService
        .login(this.f.pastas.value, this.f.slaptazodis.value)
        .subscribe(
          (res) => {
            if (res) {
              const role = this.authService.currentUserValue.role;
              if (role === Role.All || role === Role.Admin) {
                this.router.navigate(["/administratorius/skydelis"]);
              } else if (role === Role.Doctor) {
                this.router.navigate(["/specialistas/skydelis"]);
              } else if (role === Role.Patient) {
                this.router.navigate(["/seimininkas/skydelis"]);
              } else {
                this.router.navigate(["/autentifikacija/prisijungimas"]);
              }
            } else {
              this.klaida = "Prisijungimas negalimas";
            }
          },
          (klaida) => {
            this.klaida = klaida;
            this.submitted = false;
          }
        );
    }
  }
}
