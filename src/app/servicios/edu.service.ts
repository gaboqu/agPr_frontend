import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class EduService {

  constructor(private http: HttpClient) {}

  educa(): Observable<any> {
    return this.http.get('http://localhost:8080/educacion');
    
  }

  getEdu(id:number , educ:any){
    return this.http.get('http://localhost:8080/educacion/' + id, educ)
  }

  getAll(){
    return this.http.get('http://localhost:8080/educacion');
  }

  create(educ:any){
    return this.http.post('http://localhost:8080/educacion', educ);
  }

  update(id:number, educ:any){
    return this.http.put('http://localhost:8080/educacion/' +id, educ);
   
  }

  
  delete(id:number){
    return this.http.delete('http://localhost:8080/educacion/' + id);
    
  }

}
