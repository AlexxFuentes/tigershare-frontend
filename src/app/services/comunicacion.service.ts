import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private actualizarSubject = new Subject<void>();

  constructor() { }

  actualizar$ = this.actualizarSubject.asObservable();

  actualizar() {
    this.actualizarSubject.next();
  }
}
