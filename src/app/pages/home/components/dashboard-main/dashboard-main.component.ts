import { Component, OnInit, Output } from '@angular/core';
import { faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
  infoUser: any = {};

  constructor(
    private comunicacion: ComunicacionService,
    private usrService: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getInfoUser();
  }

  getInfoUser() {
    this.usrService.getInfoUser(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        console.log(data);
        this.infoUser = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  open() {
    this.interruptor = !this.interruptor;
  }
}
