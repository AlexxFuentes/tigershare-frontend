import { Component } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
  });

  formularioCambiarPassword = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(25), this.matchPassword.bind(this)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(25), this.matchPassword.bind(this)]),
  });

  formularioCambiarPlan = new FormGroup({
    plan: new FormControl('', [Validators.required]),
  });

  matchPassword(): ValidationErrors | null {
    const password = this?.formularioCambiarPassword?.get('password')?.value;
    const confirmPassword = this?.formularioCambiarPassword?.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { matchPassword: true };
    }
    return null;
  }

  constructor(
    private comunicacion: ComunicacionService,
    private usrService: UsuariosService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.comunicacion.actualizar$.subscribe(() => this.open());
    this.getInfoUser();
  }

  getInfoUser() {
    this.usrService.getInfoUser(sessionStorage.getItem('token') || '').subscribe(
      (data) => {
        console.log(data);
        this.infoUser = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  actualizarUsuario() {

  }

  actualizarPass() {

  }

  actualizarPlan() {

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
  }

  openModalEditPlan(content: any) {
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' });
    this.formularioCambiarPlan.patchValue({
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

  // cambio de plan
  get plan() {
    return this.formularioCambiarPlan.get('plan');
  }
}
