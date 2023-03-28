import { Component, ElementRef, ViewChild } from '@angular/core';
import { faUserGear, faCode, faFolder, faGear, faCrown, faSquareArrowUpRight, faFolderClosed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Font Awesome
  faUserGear = faUserGear;
  faCode = faCode;
  faFolder = faFolder;
  faGear = faGear;
  faCrown = faCrown;
  faSquareArrowUpRight = faSquareArrowUpRight;
  faFolderClosed = faFolderClosed;
  
  // Nav lateral
  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @ViewChild('my_container') myContenedor: ElementRef | undefined;

  ngAfterViewInit() {
    
  }

  abrirNavLateral(){
    this.sidebar?.nativeElement.classList.toggle("active-nav");
    this.myContenedor?.nativeElement.classList.toggle("active-cont");
  }

}
