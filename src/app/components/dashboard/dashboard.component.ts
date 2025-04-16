import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TradingChartComponent } from '../trading-chart/trading-chart.component';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { Inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';


import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, TradingChartComponent, DepositModalComponent],

  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  rol: string = '';
  tipoSeleccionado: string = 'cetes';
  duracionElegida: number = 60000;
  saldoDemo: number = 1000;
  montoApuesta: number = 100;

  historial: {
    direccion: string;
    tipo: string;
    fecha: string;
    resultado: string;
    monto: number;
  }[] = [];

  mostrarModalDeposito: boolean = false;

  @ViewChild(TradingChartComponent) refApuesta!: TradingChartComponent;

  constructor(
    private router: Router,
    @Inject(AlertService) private alertService: AlertService
  ) {}


  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.rol = localStorage.getItem('rol') || '';
    }
    
    if (!this.rol) {
      this.alertService.warning('Debes iniciar sesión para acceder al dashboard');
      this.router.navigate(['/login']);
    }
  }

  esAdmin() {
    return this.rol === 'ADMIN';
  }

  esModerador() {
    return this.rol === 'MODERATOR';
  }

  esUsuario() {
    return this.rol === 'USER';
  }

  onTipoCambio(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.tipoSeleccionado = select.value;
  }

  onDuracionCambio(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.duracionElegida = +select.value;
  }

  onMontoCambio(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.montoApuesta = +input.value;
  }

  realizarDeposito(monto: number): void {
    this.saldoDemo += monto;
    this.alertService.success(`Depósito exitoso: $${monto}`);
  }

  apostar(direccion: 'arriba' | 'abajo'): void {
    if (this.montoApuesta > this.saldoDemo) {
      this.alertService.warning('Saldo insuficiente para realizar la apuesta.');
      return;
    }

    const resultado = this.refApuesta.apostar(direccion, this.duracionElegida);
    const fecha = new Date().toLocaleString();

    if (resultado === 'Ganó') {
      this.saldoDemo += this.montoApuesta;
    } else if (resultado === 'Perdió') {
      this.saldoDemo -= this.montoApuesta;
    }

    this.historial.unshift({
      direccion,
      tipo: this.tipoSeleccionado,
      fecha,
      resultado,
      monto: this.montoApuesta
    });

    if (this.historial.length > 10) this.historial.pop();
  }
}
