import { Component } from '@angular/core';
import { faUserGear, faCode, faFolder, faGear, faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent {
  // Font Awesome
  faUserGear = faUserGear;
  faCode = faCode;
  faFolder = faFolder;
  faGear = faGear;
  faCrown = faCrown;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faFolderClosed = faFolderClosed;
  // variables
  interruptor: boolean = false;

  open(){
    this.interruptor = !this.interruptor;
  }
}
