import { Component, OnInit } from '@angular/core';
import { faSquareArrowUpRight, faFolderClosed, faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { CreateProjectDto } from 'src/app/models/project.dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';


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
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getAllsProjects();
    localStorage.removeItem('id_project');
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
    this.projectService.createNewProject(dataNewProject).subscribe(
      (res) => {
        this.getAllsProjects();
        this.showSuccess();
      },
      (err) => {
        console.log(err);
        this.showError();
      }
    );
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

  deleteProject(id: string) {
    this.showDeleteProject(id);
    this.projectService.deleteProject(id).subscribe(
      (res) => {
        this.getAllsProjects();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showSuccess() {
    this.toastr.success('', 'proyecto creado');
  }

  showError() {
    this.toastr.error('', 'error al crear el proyecto');
  }
  
  // show eliminar proyecto
  showDeleteProject(id: string) {
    this.toastr.warning('', 'Eliminando proyecto', {
      timeOut: 1000,
      extendedTimeOut: 1000,
      positionClass: 'toast-top-center',
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
      onActivateTick: true,
      enableHtml: true,
      toastClass: 'ngx-toastr',
      titleClass: 'toast-title',
      messageClass: 'toast-message',
      easing: 'ease-in',
      easeTime: 300,
    }).onTap.subscribe(() => this.deleteProject(id));
  }
}
