import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { faSquareArrowUpRight, faFolderClosed, faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-collaborations',
  templateUrl: './collaborations.component.html',
  styleUrls: ['./collaborations.component.css']
})
export class CollaborationsComponent implements OnInit {
  // Font Awesome
  faFolderClosed = faFolderClosed;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faTrashCan = faTrashCan;
  faDownload = faDownload;
  // variables
  interruptor: boolean = false;
  allsProjects: any = [];
  dataProject: any = {};

  constructor(
    private projectService: ProyectosService,
    private comunicacion: ComunicacionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getAllsProjects();
  }

  getAllsProjects() {
    this.projectService.getCollaborations(sessionStorage.getItem('token') ?? '').subscribe(
      (res) => {
        this.allsProjects = res;
      },
      (err) => {
        console.log(err);
      }
    );
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

  downloadProject(id_project: string, name_project: string) {
    this.projectService.downloadProject(id_project).subscribe(
      (res) => {
        saveAs(res, `${name_project}.zip`);
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
