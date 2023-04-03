import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { faUserGear, faCode, faFolder, faGear } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SnippetsComponent } from './components/snippets/snippets.component';

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
  interruptor = false;
  // Area visibles
  configVisibles = false;
  dashboardVisible = true;
  generalInfoVisibles = false;
  projectsVisibles = false;
  snippestVisibles = false;
  // Font Awesome
  faUserGear = faUserGear;
  faCode = faCode;
  faFolder = faFolder;
  faGear = faGear;

  constructor(public router: Router) {}

  ngOnInit(): void {
    
  }

  abrirNavLateral() {
    this.mainDashboard?.open();
    this.projects?.open();
    this.snippets?.open();
    this.sidebar?.nativeElement.classList.toggle('active-nav');
    if (this.interruptor) {
      this.open();
    }
  }

  open() {
    this.interruptor = !this.interruptor;
  }

  dashboardVisibles(){
    this.configVisibles = false;
    this.dashboardVisible = true;
    this.generalInfoVisibles = false;
    this.projectsVisibles = false;
    this.snippestVisibles = false;
  }
  configurationsVisible(){
    this.configVisibles = true;
    this.dashboardVisible = false;
    this.generalInfoVisibles = false;
    this.projectsVisibles = false;
    this.snippestVisibles = false;
  }
  generalInfoVisible(){
    this.configVisibles = false;
    this.dashboardVisible = false;
    this.generalInfoVisibles = true;
    this.projectsVisibles = false;
    this.snippestVisibles = false;
  }
  projectsVisible(){
    this.configVisibles = false;
    this.dashboardVisible = false;
    this.generalInfoVisibles = false;
    this.projectsVisibles = true;
    this.snippestVisibles = false;
  }
  snippetsVisible(){
    this.configVisibles = false;
    this.dashboardVisible = false;
    this.generalInfoVisibles = false;
    this.projectsVisibles = false;
    this.snippestVisibles = true;
  }
}
