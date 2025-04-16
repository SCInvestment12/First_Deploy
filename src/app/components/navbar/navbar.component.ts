import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol: string = '';
  estaLogueado: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const rolGuardado = localStorage.getItem('rol');
      this.rol = rolGuardado ? rolGuardado.toUpperCase() : '';
      this.estaLogueado = !!this.rol;
    }
  }
  

  esAdmin(): boolean {
    return ['ADMIN', 'MODERATOR', 'SUPER_ADMIN'].includes(this.rol);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
