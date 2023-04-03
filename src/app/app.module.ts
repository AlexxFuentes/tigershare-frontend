import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PricesComponent } from './pages/prices/prices.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { WorkAreaComponent } from './pages/work-area/work-area.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2'
import { DashboardMainComponent } from './pages/dashboard/components/dashboard-main/dashboard-main.component';
import { ProjectsComponent } from './pages/dashboard/components/projects/projects.component';
import { SnippetsComponent } from './pages/dashboard/components/snippets/snippets.component';
import { ConfigurationsComponent } from './pages/dashboard/components/configurations/configurations.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardMainComponent,
    ProjectsComponent,
    SnippetsComponent,
    ConfigurationsComponent,
    LandingPageComponent,
    LogInComponent,
    PricesComponent,
    SignUpComponent,
    WorkAreaComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
