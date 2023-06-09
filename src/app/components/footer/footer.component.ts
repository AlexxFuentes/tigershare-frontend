import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Font Awesome
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faCopyright = faCopyright;

  constructor(public router: Router) {}

}
