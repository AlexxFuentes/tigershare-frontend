import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateLoginDto } from 'src/app/models/login.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  // Font Awesome
  faFacebook = faFacebook;
  faLock = faLock;
  // variables
  statusCode: number = 0;

  formularioInicioSesion = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),//^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$
    password: new FormControl('', [Validators.required, Validators.maxLength(25)]),
  });
  
  constructor(private usrService: UsuariosService, private authService: AuthService, private router: Router) {}
  
  get email() {
    return this.formularioInicioSesion.get('email');
  }
  
  get password() {
    return this.formularioInicioSesion.get('password');
  }
  
  iniciarSesion() {
    if(this.formularioInicioSesion.valid) {
      const { email, password } = this.formularioInicioSesion.value;
      const dataLogin = new CreateLoginDto(email ?? '', password ?? '');
      this.usrService.singIn(dataLogin).subscribe(
        (data) => {
          this.authService.token = data.token;
          this.router.navigate(['home/general-information']);
        },
        (error) => {
          console.log(error);
          this.statusCode = error.error.statusCode;
        }
      )
    }
  }

}
