import { Component } from '@angular/core';
import { faFileCode, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent {
  // Font Awesome
  faFileCode = faFileCode;
  faTrashCan = faTrashCan;
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
