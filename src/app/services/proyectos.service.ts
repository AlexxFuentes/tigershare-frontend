import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProjectDto } from '../models/project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  //api: string = 'http://20.239.195.88:3000';
  //api: string = 'http://localhost:3000';
  api: string = 'https://tigershare.eastasia.cloudapp.azure.com';

  constructor(private httpClient:HttpClient) { }


  infoProject(token: string): Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/datos_usuario/${token}`);
  }

  /**
   * Función que obtiene todos los proyectos del usuario
   * @param token 
   * @returns Todos los proyectos del usuario
   */
  getAllsProjects(token: string):Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/listar/${token}`);
  }

  /**
   * Función que obtiene un proyecto por su id
   * @param id_project 
   * @returns un proyecto por su id
   */
  getProjectById(id_project: string):Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/obtener/${id_project}`);
  }

  /**
   * Función que obtiene los últimos 3 proyectos del usuario
   * @param token 
   * @returns los últimos 3 proyectos del usuario
   */
  getLastsProjects(token: string):Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/top/${token}`);
  }

  /**
   * Función que obtiene todos los proyectos en los que colabora el usuario
   * @param token 
   * @returns Todos los proyectos en los que colabora el usuario
   */
  getCollaborations(token: string):Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/encolab/${token}`);
  }

  /**
   * Función que añade un colaborador a un proyecto
   * @param pro_id 
   * @param email 
   * @returns 
   */
  addCollaborator(pro_id: string, email: string):Observable<any> {
    return this.httpClient.put(`${this.api}/proyecto/colab`, { pro_id, email });
  }

  /**
   * Función que crea un nuevo proyecto
   * @param newProject 
   * @returns token
   */
  createNewProject(newProject: CreateProjectDto):Observable<any> {
    return this.httpClient.post(`${this.api}/proyecto/crear`, newProject);
  }

  /**
   * Función que elimina un proyecto
   * @param id 
   * @returns 
   */
  deleteProject(id: string):Observable<any> {
    return this.httpClient.delete(`${this.api}/proyecto/borrar/${id}`);
  }

  /**
   * Función que actualiza un proyecto
   * @param id_project 
   * @param newData 
   * @returns 
   */
  updateProject(id_project: string, newData: any): Observable<any> {
    const nuevaRaiz = newData;
    return this.httpClient.put(`${this.api}/proyecto/actualizar/${id_project}`, nuevaRaiz);
  }

  /**
   * Función que descarga un proyecto
   * @param id_project 
   * @returns zip del proyecto
   */
  downloadProject(id_project: string): Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/descargar/${id_project}`, { responseType: 'blob' });
  }
}
