import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faCloud, faCode, faFolder, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosService } from 'src/app/services/proyectos.service';

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
  faFileExport = faFileExport
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
    private modalService: NgbModal, 
  ) { 
    this.getProjectById(localStorage.getItem('id_project') || '');
  }
  
  ngOnInit(): void {
    // Obtener las variables del localStorage
    this.codeHTML = localStorage.getItem('codeHTML') || '';
    this.codeJS = localStorage.getItem('codeJS') || '';
    this.codeCSS = localStorage.getItem('codeCSS') || '';
    this.comunicacion.actualizar$.subscribe(() => this.open());

    this.comunicacion.getDataProject$().subscribe((data) => {
      this.dataProject = data;
      localStorage.setItem('id_project', this.dataProject._id);
      this.codeCSS = data.css;
      this.codeHTML = data.html;
      this.codeJS = data.js;
    });
  }
  
  onCodeChange() {
    const htmlForPreview = this.createHtml(this.codeHTML, this.codeJS, this.codeCSS);
    this.iframeResult?.nativeElement.setAttribute('srcdoc', htmlForPreview);
    //this.haveChanges = true;
    // Guardar las variables en el localStorage
    localStorage.setItem('codeHTML', this.codeHTML);
    localStorage.setItem('codeJS', this.codeJS);
    localStorage.setItem('codeCSS', this.codeCSS);
  }

  getProjectById(id_project: string) {
    this.projectService.getProjectById(id_project).subscribe(
      (res) => {
        this.dataProject = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  updateProject(id_project: string) {
    console.log(id_project)
    const dataNewProject ={
      html: localStorage.getItem('codeHTML'),
      js: localStorage.getItem('codeJS'),
      css: localStorage.getItem('codeCSS'),
    }
    console.log(dataNewProject);
    // this.projectService.updateProject(this.newProject._id, dataNewProject).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.newProject = res;
    //     this.projectDatails = true;
    //     this.router.navigate(['/home/work-area', this.newProject._id]);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  saveChanges() {
    // Guardar cambios en el proyecto
    console.log('Guardando cambios');
    //this.haveChanges = false;
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
}
