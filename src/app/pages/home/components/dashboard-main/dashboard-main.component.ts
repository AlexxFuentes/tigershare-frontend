import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as moment from 'moment';
import * as Chart from 'chart.js';

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
  infoProjectsUser: any = {};
  lastProjects: any = [];
  dataProject: any = {};

  // Chart
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  constructor(
    private comunicacion: ComunicacionService,
    private usrService: UsuariosService,
    private projectService: ProyectosService,
    private router: Router,
  ) { 
    localStorage.removeItem('id_project');
    localStorage.removeItem('codeHTML');
    localStorage.removeItem('codeJS');
    localStorage.removeItem('codeCSS');
  }

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getInfoUser();
    this.getTopProjects();
    this.getInfoProjectsUser();

    setTimeout(() => {
      this.RenderChart(
        ['Creados','Disponibles'], 
        [this.infoProjectsUser.cantPro, this.infoProjectsUser.maxPro - this.infoProjectsUser.cantPro], 
        ['#7741BD', '#040B25'], 
        'doughnut', 'piechart'
      );
    }, 2000);

  }

  getInfoUser() {
    this.usrService.getInfoUser(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        this.infoUser = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getInfoProjectsUser() {
    this.projectService.infoProject(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        this.infoProjectsUser = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopProjects() {
    this.projectService.getLastsProjects(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
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

  showDateString(u_mod: any) {
    const now = moment();
    moment.locale('es');
    const dateModified = moment.utc(u_mod, 'YYYYMMDD');
    const timeZoneOffset = moment().utcOffset();
    const adjustedDate = dateModified.utcOffset(timeZoneOffset);
  
    return adjustedDate.from(now);
  }

  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    const doughnutChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Proyectos',
            data: maindata,
            backgroundColor: colordata,
            borderWidth: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Proyectos Disponibles'
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000,
          easing: 'easeOutQuint',
        },
        plugins: {
          canvas: {
            width: 400,
            height: 400
          }
        }
      },
    });
  }
}
