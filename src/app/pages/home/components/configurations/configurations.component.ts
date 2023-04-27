import { Component } from '@angular/core';
import { faFolderClosed, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(
    private comunicacion: ComunicacionService,
    private usrService: UsuariosService,
  ) {}

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

  open(){
    this.interruptor = !this.interruptor;
  }
}
