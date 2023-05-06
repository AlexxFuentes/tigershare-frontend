import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../models/user.dto';
import { CreateLoginDto } from '../models/login.dto'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //api: string = 'http://20.239.195.88:3000';
  //api: string = 'http://localhost:3000';
  api: string = 'https://tigershare.eastasia.cloudapp.azure.com';

  constructor(private httpClient:HttpClient) { }

  /**
   * Obtiene la informacion de un usuario por su token
   * @param token 
   * @returns info user
   */
  getInfoUser(token: string):Observable<any> {
    return this.httpClient.get(`${this.api}/usr/${token}`);
  }

  /**
   * Actualiza la informacion de un usuario
   * @param token 
   * @param data 
   * @returns true or false
   */
  updateInfoUser(token: string, data: any):Observable<any> {
    return this.httpClient.put(`${this.api}/usr/actualizar/${token}`, data);
  }

  /**
   * Actualiza la contraseña de un usuario
   * @param token 
   * @param pass 
   * @returns 
   */
  updatePassword(token: string, pass: string):Observable<any> {
    return this.httpClient.put(`${this.api}/usr/actualizarPassword/${token}`, {pass});
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
   * Inicia sesion con facebook
   * @returns token
   */
  singInFacebook(user: any):Observable<any> {
    return this.httpClient.post(`${this.api}/usr/facebook`, user);
  }

  /**
   * Permite registrar un usuario
   * @param user 
   * @returns token
   */
  singUp(user: CreateUserDto):Observable<any> {
    return this.httpClient.post(`${this.api}/usr/registrar`, user);
  }
}
