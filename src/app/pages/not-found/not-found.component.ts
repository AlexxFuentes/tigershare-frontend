import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor() {
    localStorage.removeItem('id_project');
    localStorage.removeItem('codeHTML');
    localStorage.removeItem('codeJS');
    localStorage.removeItem('codeCSS');
  }
}
