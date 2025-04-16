import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  success(mensaje: string, titulo: string = 'Éxito'): void {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#00c875'
    });
  }

  error(mensaje: string, titulo: string = 'Error'): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#e74c3c'
    });
  }

  info(mensaje: string, titulo: string = 'Información'): void {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#3498db'
    });
  }

  warning(mensaje: string, titulo: string = 'Advertencia'): void {
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#f39c12'
    });
  }
}
