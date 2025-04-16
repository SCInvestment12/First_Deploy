import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  rol: string = '';
  username: string = '';

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.rol = localStorage.getItem('rol') || 'USER';
      this.username = localStorage.getItem('username') || 'usuario_demo';
    }
  }
  
}
