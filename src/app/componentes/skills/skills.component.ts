import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent  implements OnInit{

  public editSkill:SkillService | any;

  formularioSk:FormGroup = this.skf.group({
    sk: [],
    porcentaje: [],
    
  })

 SkEnEdicion:any;

  constructor(
    private skillService: SkillService,
    private skf: FormBuilder,
    public modalSk:NgbModal,
    private tokenService: TokenService
    
    ) {}

  skill: any;
  isLogged = false;

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged = true;
      
    }else{
      this.isLogged = false;
    }


    this.getAll();
  }


 
  getAll(){
    this.skillService.skill().subscribe((data) => {
      this.skill = data;
    });

  }

  saveEd(){
     
    const skill = this.formularioSk.value;

    console.log('skill en edic es: ' + this.SkEnEdicion)
    console.log("skill es: " + skill);
    if (this.SkEnEdicion) {
      // console.log("eduenedic es: " +this.EduEnEdicion);
      // console.log("edu es: " + edu);
      skill.id=   this.SkEnEdicion.id;
      this.skillService.update( this.SkEnEdicion.id, skill).subscribe(
        { 
          next: ()  => {
            this.getAll();
            this.formularioSk.setValue({
              sk:'',
              porcentaje:'',
              
            });
            this.SkEnEdicion= undefined;
            this.modalSk.dismissAll();
            alert('Se edito con exito...!!!');
        }, 
        error: () =>{
          this.modalSk.dismissAll();
          alert('No se pudo editar esta educacion');
        }
      })

    }else{
      console.log("estoy en el create");
      this.skillService.create(skill).subscribe(
        {
          next: ()  => {
            this.getAll();
            this.modalSk.dismissAll();
            alert('Se agrego con Exito...!!!');
            
           
        }, 
        error: () =>{
          this.modalSk.dismissAll();
          alert('vuelve a intentarlo ya que no se cargo la skill.');
          
        }
      })
      
    }
  }



editS(id:number , contenidoSk:any){
  function encontrarObjetoPorId(objetos: any[], id: number) {
    for (let i = 0; i < objetos.length; i++) {
      if (objetos[i].id === id) {
        return objetos[i];
      }
    }
    return null; // Si no se encuentra ningún objeto con el ID especificado, devuelve null
  }

  const SkillEncontrada = encontrarObjetoPorId(this.skill, id);

  this.SkEnEdicion = SkillEncontrada;

  this.formularioSk.setValue({

    sk: SkillEncontrada.sk,
    porcentaje: SkillEncontrada.porcentaje,
  }
  )
  
  this.modalSk.open(contenidoSk);
}

resetForm(){
  
  this.formularioSk.setValue({
    sk:'',
    porcentaje:'',
})}



ModalOpen3(contenidoSk:any){ 
  this.modalSk.open(contenidoSk);
  this.resetForm();
  this.SkEnEdicion= undefined;
}

  delete(id:number){
    this.skillService.delete(id).subscribe(()=>{
      this.getAll();
      console.log("BORRADO");
      alert('El elemento fue eliminado...!!!');

    }) ;
  };
}




// export class SkillsComponent {

// constructor(private skillService:SkillService){}

// skills: any;

//   ngOnInit(): void{
//     this.skillService.skil().subscribe((data) => {
//       this.skills = data;
//     });
//   }

// }


