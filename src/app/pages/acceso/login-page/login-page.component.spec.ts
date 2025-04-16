import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  mostrarPassword: boolean = false;

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  login() {
    console.log('Iniciando sesión con:', {
      usuario: this.username,
      contraseña: this.password
    });
  }
}
