import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  // Font Awesome
  faFacebook = faFacebook;

  formularioRegistrarUsuario = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),//"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"//"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    password: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    confirPassword: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    terminosCondiciones: new FormControl('', [Validators.required])
  });

  constructor() {}

  registrarse(){
    console.log(this.formularioRegistrarUsuario.valid);
    console.log(this.formularioRegistrarUsuario.value);
  }

  get nombres() {
    return this.formularioRegistrarUsuario.get('nombres');
  }
  get apellidos() {
    return this.formularioRegistrarUsuario.get('apellidos');
  }
  get email() {
    return this.formularioRegistrarUsuario.get('email');
  }
  get password() {
    return this.formularioRegistrarUsuario.get('password');
  }
  get confirPassword() {
    return this.formularioRegistrarUsuario.get('confirPassword');
  }
  get fechaNacimiento() {
    return this.formularioRegistrarUsuario.get('fechaNacimiento');
  }
  get plan() {
    return this.formularioRegistrarUsuario.get('plan');
  }
  get terminosCondiciones() {
    return this.formularioRegistrarUsuario.get('terminosCondiciones');
  }
}
