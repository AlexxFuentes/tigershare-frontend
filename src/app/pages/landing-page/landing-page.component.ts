import { Component } from '@angular/core';
import { faHtml5, faCss3Alt, faJsSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  faHtml5 = faHtml5;
  faCss3Alt = faCss3Alt;
  faJsSquare = faJsSquare;

  constructor() {
    localStorage.removeItem('id_project');
    localStorage.removeItem('codeHTML');
    localStorage.removeItem('codeJS');
    localStorage.removeItem('codeCSS');
  }
}
