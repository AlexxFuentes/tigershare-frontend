import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser, faCloud, faCode, faFolder } from '@fortawesome/free-solid-svg-icons';

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
    theme: 'vs-dark',
    ...this.optionsEditor
  };
  optionsEditorHtml = {
    language: 'html',
    theme: 'vs-dark',
    ...this.optionsEditor
  };
  optionsEditorJs = {
    language: 'javascript',
    theme: 'vs-dark',
    ...this.optionsEditor
  };

  constructor() { }
  ngOnInit(): void {
  }

  onCodeChange() {
    const htmlForPreview = this.createHtml(this.codeHTML, this.codeJS, this.codeCSS);
    this.iframeResult?.nativeElement.setAttribute('srcdoc', htmlForPreview);
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
}
