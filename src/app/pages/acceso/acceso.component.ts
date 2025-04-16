import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  modo: 'login' | 'registro' | null = null;

  mostrarLogin() {
    this.modo = 'login';
  }

  mostrarRegistro() {
    this.modo = 'registro';
  }
}
