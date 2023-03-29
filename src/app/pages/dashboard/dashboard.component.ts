import { Component, ElementRef, ViewChild } from '@angular/core';
import { faUserGear, faCode, faFolder, faGear, faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Nav lateral
  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @ViewChild('my_container') myContenedor: ElementRef | undefined;
  // Font Awesome
  faUserGear = faUserGear;
  faCode = faCode;
  faFolder = faFolder;
  faGear = faGear;
  faCrown = faCrown;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faFolderClosed = faFolderClosed;
  interruptor = false;

  constructor(public router: Router) {}

  abrirNavLateral(){
    this.sidebar?.nativeElement.classList.toggle("active-nav");
    this.myContenedor?.nativeElement.classList.toggle("active-cont");
    if(this.interruptor){
      this.open();
    }
  }

  open() {
		this.interruptor = !this.interruptor;
	}
}
