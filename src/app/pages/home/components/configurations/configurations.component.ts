import { Component } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent {
  // Font Awesome
  faPenToSquare = faPenToSquare;
  // variables
  interruptor: boolean = false;
  infoUser: any = {};

  // Formularios
  formularioEditarUsuario = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9._-]{3,}$')]),
    email: new FormControl('', [Validators.required, Validators.maxLength(55), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),//"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"//"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    nombres: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z ]*$')]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z ]*$')]),
    plan: new FormControl('', [Validators.required]),
  });

  formularioCambiarPassword = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(25), this.matchPassword.bind(this)]),
  });

  constructor(
    private comunicacion: ComunicacionService,
    private usrService: UsuariosService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getInfoUser();
  }

  matchPassword(): ValidationErrors | null {
    const password = this?.formularioCambiarPassword?.get('password')?.value;
    const confirmPassword = this?.formularioCambiarPassword?.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      return { matchPassword: true };
    }
    return null;
  }

  getInfoUser() {
    this.usrService.getInfoUser(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        this.infoUser = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  actualizarUsuario() {
    const data = {
      user: this.formularioEditarUsuario.value.user,
      email: this.formularioEditarUsuario.value.email,
      nombre: this.formularioEditarUsuario.value.nombres,
      apellido: this.formularioEditarUsuario.value.apellidos,
      plan: this.formularioEditarUsuario.value.plan,
    }

    this.usrService.updateInfoUser(sessionStorage.getItem('token') || '', data).subscribe(
      (data) => {
        if(data.acknowledged) {
          this.getInfoUser();
          this.modalService.dismissAll();
          this.formularioEditarUsuario.reset();
          this.toastr.success('Datos actualizados correctamente', 'Actualización exitosa');
        } else {
          this.toastr.error('No se pudo actualizar los datos', 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarPass() {
    const pass = this.formularioCambiarPassword.value.password;
    const oldPass = this.formularioCambiarPassword.value.oldPassword;
    if(pass === oldPass) {
      this.toastr.error('La contraseña nueva no puede ser igual a la anterior', 'Error');
      return;
    } else {
      this.usrService.updatePassword(sessionStorage.getItem('token') || '', pass ?? '').subscribe(
        (data) => {
          if(data) {
            this.modalService.dismissAll();
            this.formularioCambiarPassword.reset();
            this.toastr.success('Contraseña actualizada correctamente', 'Actualización exitosa');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  open() {
    this.interruptor = !this.interruptor;
  }

  openModalEditUser(content: any) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    this.formularioEditarUsuario.patchValue({
      user: this.infoUser.user
    });
    this.formularioEditarUsuario.patchValue({
      email: this.infoUser.email
    });
    this.formularioEditarUsuario.patchValue({
      nombres: this.infoUser.nombre
    });
    this.formularioEditarUsuario.patchValue({
      apellidos: this.infoUser.apellido
    });
    this.formularioEditarUsuario.patchValue({
      plan: this.infoUser.plan
    });
  }
  
  openModalEditPass(content: any) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' });
  }

  // datos del usuario que se pueden editar
  get user() {
    return this.formularioEditarUsuario.get('user');
  }
  get email() {
    return this.formularioEditarUsuario.get('email');
  }
  get nombres() {
    return this.formularioEditarUsuario.get('nombres');
  }
  get apellidos() {
    return this.formularioEditarUsuario.get('apellidos');
  }
  get plan() {
    return this.formularioEditarUsuario.get('plan');
  }

  // cambio de contraseña
  get oldPassword() {
    return this.formularioCambiarPassword.get('oldPassword');
  }
  get password() {
    return this.formularioCambiarPassword.get('password');
  }
  get confirmPassword() {
    return this.formularioCambiarPassword.get('confirmPassword');
  }
}
