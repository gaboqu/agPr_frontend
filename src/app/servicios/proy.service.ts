import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProyService {

  constructor(private http: HttpClient) {}

  proyec(): Observable<any> {
    return this.http.get('http://localhost:8080/proyectos');
    
  }

  getAll(){
    return this.http.get('http://localhost:8080/proyectos');
  }

  create(proy:any){
    return this.http.post('http://localhost:8080/proyectos', proy);
  }

  update(id:number, proy:any){
    return this.http.put('http://localhost:8080/proyectos/' +id, proy);
   
  }

  
  delete(id:number){
    return this.http.delete('http://localhost:8080/proyectos/' + id);
    
  }

}