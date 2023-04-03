import { Component } from '@angular/core';
import { faFileCode, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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

  open(){
    this.interruptor = !this.interruptor;
  }
}
