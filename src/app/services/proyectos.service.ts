import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProjectDto } from '../models/project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  // api: string = 'http://20.239.195.88:3000';
  api: string = 'http://localhost:3000';

  constructor(private httpClient:HttpClient) { }

  getAllsProjects(token: string):Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/listar/${token}`);
  }

  getProjectById(id_project: string):Observable<any> {
    return this.httpClient.get(`${this.api}/proyecto/obtener/${id_project}`);
  }

  createNewProject(newProject: CreateProjectDto):Observable<any> {
    return this.httpClient.post(`${this.api}/proyecto/crear`, newProject);
  }

  deleteProject(id: string):Observable<any> {
    return this.httpClient.delete(`${this.api}/proyecto/borrar/${id}`);
  }

  updateProject(id_project: string, newData: any): Observable<any> {
    const nuevaRaiz = newData;
    return this.httpClient.put(`${this.api}/proyecto/actualizar/${id_project}`, nuevaRaiz);
  }
}
