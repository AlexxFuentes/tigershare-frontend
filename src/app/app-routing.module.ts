import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PricesComponent } from './pages/prices/prices.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { WorkAreaComponent } from './pages/work-area/work-area.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'sing-up', component: SignUpComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'log-in', component: LogInComponent, children:[]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'work-area', component: WorkAreaComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
