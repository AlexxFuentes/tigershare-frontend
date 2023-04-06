import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../models/user.dto';
import { CreateLoginDto } from '../models/login.dto'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  api: string = 'http://localhost:3000';

  constructor(private httpClient:HttpClient) { }

  /**
   * Obtiene todos los usuarios
   * @returns 
   */
  getAllsUsers():Observable<any> {
    return this.httpClient.get(`${this.api}/usr`,{});
  }
  
  /**
   * Permite iniciar sesion
   * @param user 
   * @returns 
   */
  singIn(dataLogin: CreateLoginDto):Observable<any> {
    return this.httpClient.post(`${this.api}/usr/ingresar`, dataLogin);
  }

  /**
   * Permite registrar un usuario
   * @param user 
   * @returns 
   */
  singUp(user: CreateUserDto):Observable<any> {
    return this.httpClient.post(`${this.api}/usr/registrar`, user);
  }
}
