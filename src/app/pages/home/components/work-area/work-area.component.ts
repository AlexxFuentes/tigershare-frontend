import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faCloud, faCode, faFolder } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { CreateProjectDto } from 'src/app/models/project.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Token } from 'monaco-editor';

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
  newProject: any = {}
  projectDatails: boolean = false;
  
  formularioNewProject = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(35)]),
  });

  get nombre() {
    return this.formularioNewProject.get('nombre');
  }

  // variables
  interruptor: boolean = false;
  // Font Awesome
  faUser = faUser;
  faCloud = faCloud;
  faCode = faCode;
  faFolder = faFolder;
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
      enabled: false //true
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

  constructor(
    private comunicacion: ComunicacionService, 
    private projectService: ProyectosService,
    private modalService: NgbModal
  ) {}
  
  ngOnInit(): void {
    // Obtener las variables del localStorage
    this.codeHTML = localStorage.getItem('codeHTML') || '';
    this.codeJS = localStorage.getItem('codeJS') || '';
    this.codeCSS = localStorage.getItem('codeCSS') || '';
    this.comunicacion.actualizar$.subscribe(() => this.open());
  }
  
  onCodeChange() {
    const htmlForPreview = this.createHtml(this.codeHTML, this.codeJS, this.codeCSS);
    this.iframeResult?.nativeElement.setAttribute('srcdoc', htmlForPreview);

    // Guardar las variables en el localStorage
    localStorage.setItem('codeHTML', this.codeHTML);
    localStorage.setItem('codeJS', this.codeJS);
    localStorage.setItem('codeCSS', this.codeCSS);
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

  openModalNuevoProyecto(content: any) {
		this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title'});
	}

  createNewProject() {
    this.modalService.dismissAll();
    const { nombre } = this.formularioNewProject.value;
    const dataNewProject = new CreateProjectDto(
      sessionStorage.getItem('token') ?? '',
      nombre ?? ''
    );
    console.log(dataNewProject);
    this.projectService.createNewProject(dataNewProject).subscribe(
      (res) => {
        console.log(res);
        this.newProject = res;
        this.projectDatails = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }
}
