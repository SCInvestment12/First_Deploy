import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service'; // ✅ Importación del servicio

@Component({
  selector: 'app-register-page',
  standalone: true,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterPageComponent {
  @ViewChild('nombre') nombreRef!: ElementRef;
  @ViewChild('apellido') apellidoRef!: ElementRef;
  @ViewChild('username') usernameRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;
  @ViewChild('curp') curpRef!: ElementRef;
  @ViewChild('fechaNacimiento') fechaNacimientoRef!: ElementRef;
  @ViewChild('correo') correoRef!: ElementRef;
  @ViewChild('telefono') telefonoRef!: ElementRef;
  @ViewChild('direccion') direccionRef!: ElementRef;
  @ViewChild('terminos') terminosRef!: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  registrar(): void {
    if (!this.terminosRef.nativeElement.checked) {
      this.alertService.warning('Debes aceptar los términos y condiciones');
      return;
    }

    const usuario = {
      nombre: this.nombreRef.nativeElement.value,
      apellidos: this.apellidoRef.nativeElement.value,
      username: this.usernameRef.nativeElement.value,
      password: this.passwordRef.nativeElement.value,
      curp: this.curpRef.nativeElement.value,
      fechaNacimiento: this.fechaNacimientoRef.nativeElement.value,
      correoElectronico: this.correoRef.nativeElement.value,
      telefono: this.telefonoRef.nativeElement.value,
      direccion: this.direccionRef.nativeElement.value
    };

    this.http.post('http://localhost:8096/api/traders', usuario).subscribe({
      next: () => {
        this.alertService.success('✅ Usuario registrado correctamente');
        setTimeout(() => this.router.navigate(['/login']), 1500); // ✅ Redirección automática
      },
      error: () => {
        this.alertService.error('❌ Error al registrar. Verifica los datos o intenta más tarde.');
      }
    });
  }
}
