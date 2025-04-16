import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  nombreRef: string = '';
  apellidoRef: string = '';
  usernameRef: string = '';
  passwordRef: string = '';
  curpRef: string = '';
  fechaNacimientoRef: string = '';
  correoRef: string = '';
  telefonoRef: string = '';
  direccionRef: string = '';
  terminosRef: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  registrar(): void {
    const nuevoUsuario = {
      nombre: this.nombreRef,
      apellidos: this.apellidoRef,
      username: this.usernameRef,
      password: this.passwordRef,
      curp: this.curpRef,
      fechaNacimiento: this.fechaNacimientoRef,
      correoElectronico: this.correoRef,
      telefono: this.telefonoRef,
      direccion: this.direccionRef
    };

    this.http.post('http://localhost:8096/api/traders', nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert('Ocurrió un error al registrar el usuario');
      }
    });
  }
}
