import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SkillService {

  constructor(private http: HttpClient) {}

  skill(): Observable<any> {
    return this.http.get('http://localhost:8080/skills');
    
  }

  getSkill(id:number , skl:any){
    return this.http.get('http://localhost:8080/skills/' + id, skl)
  }

  getAll(){
    return this.http.get('http://localhost:8080/skills');
  }

  create(skl:any){
    return this.http.post('http://localhost:8080/skills', skl);
  }

  update(id:number, skl:any){
    return this.http.put('http://localhost:8080/skills/' +id, skl);
  }

  delete(id:number){
    return this.http.delete('http://localhost:8080/skills/' + id);
    
  }

}