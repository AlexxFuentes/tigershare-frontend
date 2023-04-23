import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PricesComponent } from './pages/prices/prices.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { WorkAreaComponent } from './pages/home/components/work-area/work-area.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProjectsComponent } from './pages/home/components/projects/projects.component';
import { ConfigurationsComponent } from './pages/home/components/configurations/configurations.component';
import { SnippetsComponent } from './pages/home/components/snippets/snippets.component';
import { DashboardMainComponent } from './pages/home/components/dashboard-main/dashboard-main.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'sing-up', component: SignUpComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService], 
    children: [
      {path: 'work-area/:id', component: WorkAreaComponent},
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
