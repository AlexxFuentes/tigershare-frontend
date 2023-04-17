import { Component, OnInit, Output } from '@angular/core';
import { faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {
  // Font Awesome
  faCrown = faCrown;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faFolderClosed = faFolderClosed;
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
