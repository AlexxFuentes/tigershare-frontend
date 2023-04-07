import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUserGear, faCode, faFolder, faGear, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { AuthService } from 'src/app/services/auth.service';
import { WorkAreaComponent } from './components/work-area/work-area.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Nav lateral
  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @ViewChild('mainDashboard') mainDashboard: DashboardMainComponent | undefined;
  @ViewChild('projects') projects: ProjectsComponent | undefined;
  @ViewChild('snippets') snippets: SnippetsComponent | undefined;
  @ViewChild('configurations') configurations: ConfigurationsComponent | undefined;
  @ViewChild('workArea') workArea: WorkAreaComponent | undefined;
  interruptor = false;
  // Area visibles
  configVisibles = false;
  dashboardVisible = true;
  projectsVisibles = false;
  snippestVisibles = false;
  workAreaVisible = false;
  // Font Awesome
  faUserGear = faUserGear;
  faCode = faCode;
  faFolder = faFolder;
  faGear = faGear;
  faFileCode = faFileCode;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  cerrarSesion() {
    this.authService.logOut();
    this.router.navigate(['log-in']);  
  }

  abrirNavLateral() {
    this.mainDashboard?.open();
    this.projects?.open();
    this.snippets?.open();
    this.configurations?.open();
    this.workArea?.open();
    this.sidebar?.nativeElement.classList.toggle('active-nav');
    if (this.interruptor) {
      this.open();
    }
  }

  open() {
    this.interruptor = !this.interruptor;
    if(this.sidebar?.nativeElement.classList.contains('active-nav')){
      this.sidebar?.nativeElement.classList.toggle('active-nav');
      this.mainDashboard?.open();
      this.projects?.open();
      this.snippets?.open();
      this.configurations?.open();
      this.workArea?.open();
    }
  }

  setVisibilidad(configVisibles: boolean, dashboardVisible: boolean, 
    projectsVisibles: boolean, snippestVisibles: boolean, workAreaVisible: boolean
  ) {
    this.configVisibles = configVisibles;
    this.dashboardVisible = dashboardVisible;
    this.projectsVisibles = projectsVisibles;
    this.snippestVisibles = snippestVisibles;
    this.workAreaVisible = workAreaVisible;
  }
}
