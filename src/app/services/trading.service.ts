// ✅ trading.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradingService {
  private seriesState: { [key: string]: any[] } = {}; // guarda el historial por tipo de activo

  constructor() {
    ['cetes', 'etfs', 'acciones', 'crypto'].forEach(tipo => {
      this.seriesState[tipo] = this.generarSerieInicial();
    });
  }

  // ✅ Simula una petición de datos actualizados
  getTradingBars(tipo: string): Observable<any[]> {
    const data = this.seriesState[tipo];

    // ✅ Generar una nueva vela basada en la última
    const last = data[data.length - 1];
    const nextBase = last.close + this.randomDelta();

    const nuevaVela = {
      timestamp: last.timestamp + 60000, // +1 minuto
      open: last.close,
      high: nextBase + 5,
      low: nextBase - 5,
      close: nextBase + (Math.random() > 0.5 ? 3 : -3)
    };

    // ✅ Agrega la nueva vela y elimina la más vieja si hay más de 30
    data.push(nuevaVela);
    if (data.length > 30) {
      data.shift(); // mantiene el array con tamaño constante
    }

    return of([...data]); // devuelve una copia
  }

  // ✅ Crea las primeras 20 velas iniciales
  private generarSerieInicial(): any[] {
    const now = Date.now();
    const base = 100;

    return Array.from({ length: 20 }, (_, i) => {
      const valor = base + i * 5;
      return {
        timestamp: now + i * 60000,
        open: valor,
        high: valor + 5,
        low: valor - 5,
        close: valor + (Math.random() > 0.5 ? 3 : -3)
      };
    });
  }

  private randomDelta(): number {
    return Math.floor(Math.random() * 10 - 5); // valor entre -5 y +5
  }
}
