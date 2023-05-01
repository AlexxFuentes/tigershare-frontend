import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as moment from 'moment';

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
  lastProjects: any = [];
  dataProject: any = {};

  constructor(
    private comunicacion: ComunicacionService,
    private usrService: UsuariosService,
    private projectService: ProyectosService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getInfoUser();
    this.getTopProjects();
  }

  getInfoUser() {
    this.usrService.getInfoUser(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        //console.log(data);
        this.infoUser = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getTopProjects() {
    this.projectService.getLastsProjects(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        console.log(data);
        this.lastProjects = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openProject(id_project: string) {
    this.router.navigate(['/home/work-area/', id_project]);
    this.comunicacion.sendIdProject(id_project);
    this.getProjectById(id_project);
  }

  getProjectById(id_project: string) {
    this.projectService.getProjectById(id_project).subscribe(
      (res) => {
        this.dataProject = res;
        this.comunicacion.sendDataProject(this.dataProject);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  open() {
    this.interruptor = !this.interruptor;
  }

  showDateString(u_mod:any){
    moment.locale('es');
    return moment(u_mod,'YYYYMMDD').fromNow();
  }
}
