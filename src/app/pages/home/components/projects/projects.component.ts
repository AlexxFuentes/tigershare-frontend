import { Component, OnInit } from '@angular/core';
import { faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit{
  // Font Awesome
  faFolderClosed = faFolderClosed;
  faSquareArrowUpRight = faSquareArrowUpRight;
  // variables
  interruptor: boolean = false;
  allsProjects: any = [];

  constructor(
    private comunicacion: ComunicacionService,
    private proyectosService: ProyectosService
  ) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getAllsProjects();
  }

  open() {
    this.interruptor = !this.interruptor;
  }

  getAllsProjects() {
    this.proyectosService.getAllsProjects(sessionStorage.getItem('token')!).subscribe(
      (res) => {
        console.log(res);
        this.allsProjects = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
