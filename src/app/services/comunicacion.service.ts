import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private actualizarSubject = new Subject<void>();
  private idProjectSubject = new Subject<string>();
  private dataProjectSubject = new Subject<any>();

  constructor() { }

  actualizar$ = this.actualizarSubject.asObservable();

  actualizar() {
    this.actualizarSubject.next();
  }

  sendIdProject(id_project: string) {
    this.idProjectSubject.next(id_project);
  }

  getIdProject$() {
    return this.idProjectSubject.asObservable();
  }

  sendDataProject(data: any) {
    this.dataProjectSubject.next(data);
  }

  getDataProject$() {
    return this.dataProjectSubject.asObservable();
  }
}
