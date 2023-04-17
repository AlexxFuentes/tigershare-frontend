import { Component } from '@angular/core';
import { faFolderClosed, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent {
  // Font Awesome
  faPenToSquare = faPenToSquare;
  // variables
  interruptor: boolean = false;

  constructor(private comunicacion: ComunicacionService) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
  }

  open(){
    this.interruptor = !this.interruptor;
  }
}
