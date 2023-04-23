import { Component, OnInit } from '@angular/core';
import { faSquareArrowUpRight, faFolderClosed, faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { CreateProjectDto } from 'src/app/models/project.dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit{
  // Font Awesome
  faFolderClosed = faFolderClosed;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faTrashCan = faTrashCan;
  faDownload = faDownload;
  // variables
  interruptor: boolean = false;
  allsProjects: any = [];
  dataProject: any = {};

  // Formulario nuevo proyecto
    formularioNewProject = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(35)]),
  });

  get nombre() {
    return this.formularioNewProject.get('nombre');
  }

  constructor(
    private comunicacion: ComunicacionService,
    private projectService: ProyectosService,
    private modalService: NgbModal,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getAllsProjects();
  }

  open() {
    this.interruptor = !this.interruptor;
  }

  openModal(content: any) {
		this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title'});
	}

  getAllsProjects() {
    this.projectService.getAllsProjects(sessionStorage.getItem('token')!).subscribe(
      (res) => {
        //console.log(res);
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

  createNewProject() {
    this.modalService.dismissAll();
    const { nombre } = this.formularioNewProject.value;
    const dataNewProject = new CreateProjectDto(
      sessionStorage.getItem('token') ?? '',
      nombre ?? ''
    );
    //console.log(dataNewProject);
    this.projectService.createNewProject(dataNewProject).subscribe(
      (res) => {
        //console.log(res);
        this.getAllsProjects();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProjectById(id_project: string) {
    this.projectService.getProjectById(id_project).subscribe(
      (res) => {
        this.dataProject = res;
        console.log(this.dataProject);
        this.comunicacion.sendDataProject(this.dataProject);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(
      (res) => {
        //console.log(res);
        this.getAllsProjects();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
