import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  AfterContentChecked,
} from "@angular/core";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/angular";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import ltLocale from "@fullcalendar/core/locales/lt";
import { Kalendorius } from "../kalendorius.model";
import { KalendoriusService } from "../kalendorius.service";
import { PerziuretiKalendoriusComponent } from "./perziureti-kalendorius/perziureti-kalendorius.component";

@Component({
  selector: "app-kalendorius",
  templateUrl: "./kalendorius.component.html",
  styleUrls: ["./kalendorius.component.sass"],
})
export class KalendoriusComponent implements OnInit {
  @ViewChild("calendar", { static: false })
  uzkrove = false;
  kalendorius: Kalendorius | null;
  //public addCusForm: FormGroup;
  dialogTitle: string;
  kalendoriausDuomenys: any;

  kalendoriausVizitai: EventInput[];
  //tempEvents: EventInput[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public kalendoriusService: KalendoriusService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef
  ) {
    this.dialogTitle = "Add New Event";
    this.kalendorius = new Kalendorius({});
    //this.addCusForm = this.createCalendarForm(this.kalendorius);
  }

  public ngOnInit(): void {
    this.kalendoriusService.getPatvirtintusVizitus().subscribe((duomenys) => {
      this.kalendoriausDuomenys = duomenys;
      this.kalendoriausVizitai = this.kalendoriausDuomenys.map((duomenys) => ({
        id: duomenys.id_vizitas,
        title: duomenys.vardas + " " + duomenys.pavarde + " " + duomenys.telnr,
        start: duomenys.vizitasdiena + "T" + duomenys.vizitaspradzia,
        end: duomenys.vizitasdiena + "T" + duomenys.vizitaspabaiga,
        className: this.gautiKlase(duomenys.vizitasbusena),
        allDay: false,
      }));
      this.kalendoriausNustatymai.initialEvents = this.kalendoriausVizitai;
      this.uzkrove = true;
    });
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  kalendoriausNustatymai: CalendarOptions = {
    locale: ltLocale,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "timeGridDay",
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    droppable: false,
    //select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),
    slotLabelFormat: {
      hour: "2-digit",
      minute: "2-digit",
    },
    slotMinTime: "07:00",
    slotMaxTime: "21:00",
    slotLabelInterval: "01:00",
    slotDuration: "00:15",
  };

  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);
  }

  eventClick(row) {
    this.kalendorius = this.filtras(row.event.id);
    var antraste = "redaguoti";
    if (this.kalendorius.vizitasbusena == "Patvirtintas")
      antraste = "perziureti";
    const dialogRef = this.dialog.open(PerziuretiKalendoriusComponent, {
      data: {
        kalendorius: this.kalendorius,
        veiksmas: antraste,
      },
    });

    dialogRef.afterClosed().subscribe((atsakymas) => {
      if (atsakymas === 1) {
        const indeksas = this.kalendoriausDuomenys.findIndex(
          (x) => x.id_vizitas === this.kalendorius.id_vizitas
        );

        this.kalendoriausDuomenys[indeksas] =
          this.kalendoriusService.getFormosDuomenis();
        this.kalendoriausDuomenys[indeksas].vizitasbusena = "Atliktas";

        this.kalendoriausVizitai.forEach(function (element, index) {
          if (this.kalendoriausDuomenys[indeksas].id_vizitas === element.id) {
            this.editEvent(index);
          }
        }, this);

        this.rodytiPranesima(
          "snackbar-success",
          "Sėkmingai išsaugojote vizito ir gyvūno įrašų duomenis",
          "bottom",
          "center"
        );
      }
    });
  }

  editEvent(indeksas) {
    const kalendoriausVizitai = this.kalendoriausVizitai.slice();
    const vienasVizitas = Object.assign({}, kalendoriausVizitai[indeksas]);
    vienasVizitas.className = "fc-event-success";
    kalendoriausVizitai[indeksas] = vienasVizitas;
    this.kalendoriausVizitai = kalendoriausVizitai;

    this.kalendoriausNustatymai.events = kalendoriausVizitai;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  gautiKlase(busena) {
    let klase: string;

    if (busena === "Atliktas") klase = "fc-event-success";
    else if (busena === "Patvirtintas") klase = "fc-event-danger";

    return klase;
  }
  filtras(id) {
    const kalendoriausDuomenyss: Kalendorius = this.kalendoriausDuomenys.find(
      (x: Kalendorius) => x.id_vizitas == id
    );
    return kalendoriausDuomenyss;
  }
  rodytiPranesima(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
