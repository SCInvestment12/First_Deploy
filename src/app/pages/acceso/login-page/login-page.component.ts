import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AlertService],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  login(): void {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:8096/api/traders/login', loginData).subscribe({
      next: (response: any) => {
        this.alertService.success('Inicio de sesión exitoso');

        // ✅ Validación para evitar error en prerender
        if (typeof window !== 'undefined') {
          localStorage.setItem('rol', response.rol || 'USER');
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.alertService.error('Credenciales incorrectas o usuario no encontrado');
      }
    });
  }
}
