import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faCloud, faCode, faFolder, faFileExport, faFloppyDisk, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.css']
})
export class WorkAreaComponent implements OnInit {
  @ViewChild('resultCode') iframeResult: ElementRef | undefined;
  @ViewChild('html') editorHtml: ElementRef | undefined;
  @ViewChild('css') editorCss: ElementRef | undefined;
  @ViewChild('js') editorJs: ElementRef | undefined;
  @ViewChild('modalSaveChanges') modalSaveChanges: any;
  dataProject: any = {};
  
  // variables
  interruptor: boolean = false;
  // Font Awesome
  faUser = faUser;
  faCloud = faCloud;
  faCode = faCode;
  faFolder = faFolder;
  faFileExport = faFileExport;
  faFloppyDisk = faFloppyDisk;
  faUserPlus = faUserPlus;
  // Code Editor
  codeJS: string = '';
  codeHTML: string = '';
  codeCSS: string = '';
  optionsEditor = {
    theme: 'vs-dark',
    fontSize: 15,
    automaticLayout: true,
    fixedOverflowWidgets: true, //investigar
    scrollBeyondLastLine: false, //investigar
    roundedSelection: false, //investigar
    padding: {
      top: 10
    },
    lineNumbers: 'on', //off
    minimap: {
      enabled: true //true
    }
  }
  optionsEditorCss = {
    language: 'css',
    ...this.optionsEditor
  };
  optionsEditorHtml = {
    language: 'html',
    ...this.optionsEditor
  };
  optionsEditorJs = {
    language: 'javascript',
    ...this.optionsEditor
  };

  // Formulario nuevo colaborador
  formCollaborator = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(35), Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
  });
  
  get email() {
    return this.formCollaborator.get('email');
  }

  constructor(
    private comunicacion: ComunicacionService, 
    private projectService: ProyectosService,
    private modalService: NgbModal, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clipboard: Clipboard,
    private toastr: ToastrService,
  ) { 
    if(localStorage.getItem('id_project')){
      this.getProjectById(localStorage.getItem('id_project') || '');
    }
  }
  
  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.onCodeChange();
    
    this.comunicacion.getDataProject$().subscribe((data) => {
      this.dataProject = data;
      localStorage.setItem('id_project', this.dataProject._id);
      this.codeCSS = data.raiz.css;
      this.codeHTML = data.raiz.html;
      this.codeJS = data.raiz.js;
      this.onCodeChange();
    });

    let previousUrl = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (previousUrl && previousUrl !== event.url) {
          localStorage.removeItem('id_project');
          localStorage.removeItem('codeHTML');
          localStorage.removeItem('codeJS');
          localStorage.removeItem('codeCSS');
        }
        previousUrl = event.url;
      }
    });
  }
  
  onCodeChange() {
    const htmlForPreview = this.createHtml(this.codeHTML, this.codeJS, this.codeCSS);
    this.iframeResult?.nativeElement.setAttribute('srcdoc', htmlForPreview);
    // Guardar cambios en el localStorage
    localStorage.setItem('codeHTML', this.codeHTML);
    localStorage.setItem('codeJS', this.codeJS);
    localStorage.setItem('codeCSS', this.codeCSS);
  }

  copyLink() {
    const link: string = 'http://localhost:4200/work-area-publica/' + this.dataProject._id;
    this.clipboard.copy(link);
    this.toastr.success('Link copiado al portapapeles', 'Copiado', {});
  }

  getProjectById(id_project: string) {
    if(!this.router.url.match('/home/work-area/*')){
      this.interruptor = true;
    }
    // esta ruta es: work-area-publica/:id_project
    this.projectService.getProjectById(id_project).subscribe(
      (data) => {
        this.dataProject = data;
        // console.log(this.dataProject);
        localStorage.setItem('id_project', this.dataProject._id);
        this.codeCSS = data.raiz.css;
        this.codeHTML = data.raiz.html;
        this.codeJS = data.raiz.js;
        this.onCodeChange();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  updateProject(id_project: string) {
    const dataNewProject ={
      html: localStorage.getItem('codeHTML'),
      js: localStorage.getItem('codeJS'),
      css: localStorage.getItem('codeCSS'),
    }
    this.projectService.updateProject(id_project, dataNewProject).subscribe(
      (res) => {
        this.showSaveChanges();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addCollaborator() {
    this.projectService.addCollaborator(this.dataProject._id, this.formCollaborator.value.email ?? '').subscribe(
      (res) => {
        console.log(res);
        this.getProjectById(this.dataProject._id);
        this.toastr.success('Colaborador añadido', 'Añadido', {});
        this.modalService.dismissAll();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveChanges() {
    console.log('Guardando cambios');
    this.modalService.dismissAll();
  }

  createHtml(html: string, js: string, css: string) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Code link</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            ${js}
          </script>
        </body>
      </html>`;
  }
  
  open(){
    this.interruptor = !this.interruptor;
  }

  openModal(content: any) {
		this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title'});
	}

  getRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }

  // show: Guardar cambios
  showSaveChanges() {
    this.toastr.success('', 'Guardar cambios');
  }

  showDateString(u_mod:any){
    moment.locale('es');
    return moment(u_mod,'YYYYMMDD').fromNow();
  }
}
