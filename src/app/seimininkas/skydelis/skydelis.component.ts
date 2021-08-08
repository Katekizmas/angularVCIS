import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

@Component({
  selector: 'app-skydelis',
  templateUrl: './skydelis.component.html',
  styleUrls: ['./skydelis.component.sass'],
})
export class  SkydelisComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  constructor() {}
  ngOnInit() {
  }
}
