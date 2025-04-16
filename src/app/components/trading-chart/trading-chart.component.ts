import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexAnnotations,
  ApexPlotOptions
} from 'ng-apexcharts';
import { TradingService } from '../../services/trading.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-trading-chart',
  standalone: true,
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.css'],
  imports: [NgApexchartsModule]
})
export class TradingChartComponent implements OnInit, OnDestroy {
  @Input() tipo: string = 'cetes';

  // ✅ Opciones del gráfico configuradas para estilo Binomo
  chartOptions!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    annotations?: {
      xaxis: any[];
      points: any[];
    };
    plotOptions?: ApexPlotOptions;
  };

  seriesData: any[] = []; // Arreglo con los datos de las velas
  intervalId: any; // Control del intervalo para generar nuevas velas

  constructor(private tradingService: TradingService) {}

  ngOnInit(): void {
    this.loadData();

    // ✅ Genera una nueva vela cada 3 segundos
    this.intervalId = setInterval(() => this.agregarVelaSimulada(), 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Limpia el intervalo cuando el componente se destruye
  }

  // ✅ Carga los datos iniciales de la gráfica
  loadData(): void {
    this.tradingService.getTradingBars(this.tipo).subscribe((data: any[]) => {
      this.seriesData = data.map((bar: any) => ({
        x: new Date(bar.timestamp).getTime(),
        y: [bar.open, bar.high, bar.low, bar.close]
      }));

      this.chartOptions = {
        series: [{ data: this.seriesData }],
        chart: {
          type: 'candlestick',
          height: 400,
          background: '#101010',
          foreColor: '#ffffff',
          toolbar: {
            show: true,
            autoSelected: 'zoom'
          },
          animations: {
            enabled: true,
            dynamicAnimation: { enabled: true, speed: 400 }
          },
          zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: true
          }
        },
        plotOptions: {
          candlestick: {
            // ✅ Hace las velas más delgadas (estilo profesional)
            wick: {
              useFillColor: true
            }
          }
        },
        dataLabels: { enabled: false },
        title: { text: this.tipo.toUpperCase(), align: 'left' },
        xaxis: { type: 'datetime' },
        tooltip: { enabled: true },
        annotations: { xaxis: [], points: [] }
      };
    });
  }

  // ✅ Agrega una nueva vela cada X segundos
  agregarVelaSimulada(): void {
    if (this.seriesData.length === 0) return;

    const ultima = this.seriesData[this.seriesData.length - 1];
    const timestamp = ultima.x + 40000; // 1 minuto después
    const base = ultima.y[3];
    const open = base;
    const close = base + (Math.random() > 0.5 ? 3 : -3);
    const high = Math.max(open, close) + 2;
    const low = Math.min(open, close) - 2;

    const nuevaVela = {
      x: timestamp,
      y: [open, high, low, close]
    };

    this.seriesData.push(nuevaVela);

    // ✅ Se muestran hasta 50 velas visibles
    if (this.seriesData.length > 50) {
      this.seriesData.shift(); // Remueve la más antigua para simular scroll
    }

    // Actualiza la serie del gráfico
    this.chartOptions.series = [{ data: [...this.seriesData] }];
  }

  // ✅ Lógica de apuesta y anotaciones
  public apostar(direccion: 'arriba' | 'abajo', duracion: number): string {
    if (this.seriesData.length === 0) return 'N/A';

    const ultima = this.seriesData[this.seriesData.length - 1];
    const valorY = ultima.y[3];
    const puntoX = ultima.x;

    // Marca la apuesta en la gráfica
    this.chartOptions.annotations!.points!.push({
      x: puntoX,
      y: valorY,
      marker: {
        size: 8,
        fillColor: direccion === 'arriba' ? '#00ff5b' : '#ff3e3e',
        strokeColor: '#000'
      },
      label: {
        borderColor: '#fff',
        offsetY: -10,
        style: {
          background: direccion === 'arriba' ? '#00ff5b' : '#ff3e3e',
          color: '#000'
        },
        text: direccion === 'arriba' ? '↑ Apuesta' : '↓ Apuesta'
      }
    });

    const resultado = Math.random() > 0.5 ? 'Ganó' : 'Perdió';

    // Marca el resultado después del tiempo seleccionado
    setTimeout(() => {
      const nuevoValorY = valorY + (resultado === 'Ganó' ? 2 : -2);
      const nuevoX = puntoX + duracion;

      this.chartOptions.annotations!.points!.push({
        x: nuevoX,
        y: nuevoValorY,
        marker: {
          size: 10,
          fillColor: resultado === 'Ganó' ? '#00ff5b' : '#ff3e3e',
          strokeColor: '#ffffff'
        },
        label: {
          borderColor: '#ffffff',
          offsetY: -10,
          style: {
            background: resultado === 'Ganó' ? '#00ff5b' : '#ff3e3e',
            color: '#000'
          },
          text: resultado === 'Ganó' ? '✔ GANÓ' : '✖ PERDIÓ'
        }
      });
    }, duracion);

    return resultado;
  }
}
