import { Component } from '@angular/core';
import {
  faSquareArrowUpRight,
  faFolderClosed,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  // Font Awesome
  faFolderClosed = faFolderClosed;
  faSquareArrowUpRight = faSquareArrowUpRight;
  // variables
  interruptor: boolean = false;

  open() {
    this.interruptor = !this.interruptor;
  }
}
