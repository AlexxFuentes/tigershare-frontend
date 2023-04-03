import { Component } from '@angular/core';
import { faFolderClosed, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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

  open(){
    this.interruptor = !this.interruptor;
  }
}
