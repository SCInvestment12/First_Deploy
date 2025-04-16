import { Component, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector: 'app-trading-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.css']
})
export class TradingChartComponent {
  isBrowser: boolean = false;

  // ✅ Input para recibir el tipo de activo desde el dashboard
  @Input() tipo: string = 'cetes';

  chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
  } | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.chartOptions = {
        series: [
          {
            name: "Series 1",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          type: "line",
          height: 350
        },
        xaxis: {
          categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"]
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: "Historial de Ventas"
        },
        tooltip: {
          enabled: true
        }
      };
    }
  }

  // ✅ Método necesario para que Dashboard lo use
  apostar(direccion: 'arriba' | 'abajo', duracion: number): string {
    const random = Math.random();
    return random > 0.5 ? 'Ganó' : 'Perdió';
  }
}
