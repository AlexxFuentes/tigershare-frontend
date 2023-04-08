import { Component } from '@angular/core';
import {
  faSquareArrowUpRight,
  faFolderClosed,
} from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

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

  constructor(private comunicacion: ComunicacionService) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
  }

  open() {
    this.interruptor = !this.interruptor;
  }
}
