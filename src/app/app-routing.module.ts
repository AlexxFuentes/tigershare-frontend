import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PricesComponent } from './pages/prices/prices.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { WorkAreaComponent } from './pages/dashboard/components/work-area/work-area.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProjectsComponent } from './pages/dashboard/components/projects/projects.component';
import { ConfigurationsComponent } from './pages/dashboard/components/configurations/configurations.component';
import { SnippetsComponent } from './pages/dashboard/components/snippets/snippets.component';
import { DashboardMainComponent } from './pages/dashboard/components/dashboard-main/dashboard-main.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'sing-up', component: SignUpComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], 
    children: [
      {path: 'work-area', component: WorkAreaComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'configurations', component: ConfigurationsComponent},
      {path: 'snippets', component: SnippetsComponent},
      {path: 'general-information', component: DashboardMainComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
