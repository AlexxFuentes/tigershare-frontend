import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  // Font Awesome
  faFacebook = faFacebook;
  faLock = faLock;

  formularioInicioSesion = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),//^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$
    password: new FormControl('', [Validators.required, Validators.maxLength(25)]),
  });
  
  constructor() {}
  
  get email() {
    return this.formularioInicioSesion.get('email');
  }
  
  get password() {
    return this.formularioInicioSesion.get('password');
  }
  
  iniciarSesion() {
    console.log(this.formularioInicioSesion);
    console.log(this.formularioInicioSesion.value);
    console.log(this.formularioInicioSesion.valid);
  }

}
