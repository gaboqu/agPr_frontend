import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpService {

  constructor(private http: HttpClient) {}

  exper(): Observable<any> {
    return this.http.get('http://localhost:8080/experiencias');
  }

  getExp(id:number , expe:any){
    return this.http.get('http://localhost:8080/experiencias/' + id, expe)
  }

  getAll(){
    return this.http.get('http://localhost:8080/experiencias');
  }

  create(expe:any){
    return this.http.post('http://localhost:8080/experiencias', expe);
  }

  update(id:number, expe:any){
    return this.http.put('http://localhost:8080/experiencias/' +id, expe);
   
  }

  
  delete(id:number){
    return this.http.delete('http://localhost:8080/experiencias/' + id);
    
  }

}
