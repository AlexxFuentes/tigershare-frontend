import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { CreateUserDto } from 'src/app/models/user.dto';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // Font Awesome
  faFacebook = faFacebook;

  // Formulario
  formularioRegistrarUsuario = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    user: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),//"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"//"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    password: new FormControl('', [Validators.required, Validators.maxLength(25) ]),
    confirmPassword: new FormControl('' ,[Validators.required, Validators.maxLength(25), this.matchPassword.bind(this) ]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    terminosCondiciones: new FormControl('', [Validators.required]),
  });

  matchPassword():  ValidationErrors | null{
    const password = this?.formularioRegistrarUsuario?.get('password')?.value;
    const confirmPassword = this?.formularioRegistrarUsuario?.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      return { matchPassword: true };
    } 
    return null;
  }

  constructor(private userService: UsuariosService) {}
  
  ngOnInit(): void {}
  
  registrarUsuario(){
    if(this.formularioRegistrarUsuario.valid){
      const { nombres, apellidos, user, email, password, fechaNacimiento, plan } = this.formularioRegistrarUsuario.value;
      const newUser = new CreateUserDto(nombres ?? '', apellidos ?? '', user ?? '', email ?? '', password ?? '', plan ?? '', new Date(fechaNacimiento ?? ''));
      this.userService.singUp(newUser).subscribe(
        (token) => {
          console.log(token);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  get nombres() {
    return this.formularioRegistrarUsuario.get('nombres');
  }
  get apellidos() {
    return this.formularioRegistrarUsuario.get('apellidos');
  }
  get user() {
    return this.formularioRegistrarUsuario.get('user');
  }
  get email() {
    return this.formularioRegistrarUsuario.get('email');
  }
  get password() {
    return this.formularioRegistrarUsuario.get('password');
  }
  get confirmPassword() {
    return this.formularioRegistrarUsuario.get('confirmPassword');
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
