import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserGear, faCode, faFolder, faGear, faFileCode, faFolderTree } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  interruptor = false;
  // Font Awesome
  faUserGear = faUserGear;
  faCode = faCode;
  faFolder = faFolder;
  faGear = faGear;
  faFileCode = faFileCode;
  faFolderTree = faFolderTree;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private comunication: ComunicacionService, 
    private authSocialService: SocialAuthService,
  ) {}

  ngOnInit(): void {}

  cerrarSesion() {
    localStorage.removeItem('codeHTML');
    localStorage.removeItem('codeJS');
    localStorage.removeItem('codeCSS');
    localStorage.removeItem('id_project');

    this.authSocialService.signOut().then(
      () => {
        this.authService.logOut();
        this.router.navigate(['log-in']);
      }
    ).catch(
      (error) => {
        this.authService.logOut();
        this.router.navigate(['log-in']);
      }
    )
  }
  
  abrirNavLateral() {
    this.comunication.actualizar();
    this.sidebar?.nativeElement.classList.toggle('active-nav');
    if (this.interruptor) {
      this.openNavSuperior();
    }
  }

  openNavSuperior() {
    this.interruptor = !this.interruptor;
    if(this.sidebar?.nativeElement.classList.contains('active-nav')){
      this.sidebar?.nativeElement.classList.toggle('active-nav');
      this.comunication.actualizar();
    }
  }
}
