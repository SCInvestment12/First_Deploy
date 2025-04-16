import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposit-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.css']
})
export class DepositModalComponent {
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmarDeposito = new EventEmitter<number>();

  monto: number = 0;

  cerrarModal(): void {
    this.cerrar.emit();
    this.monto = 0;
  }

  depositar(): void {
    if (this.monto > 0) {
      this.confirmarDeposito.emit(this.monto);
      this.cerrarModal();
    } else {
      alert('Ingresa un monto válido');
    }
  }
}
