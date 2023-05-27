import { Component, OnInit } from '@angular/core';
import { EduService } from 'src/app/servicios/edu.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent  implements OnInit{

  public editEdu:EduService | any;

  formularioEd:FormGroup = this.eduf.group({
    img: [],
    titulo: [],
    institucion: [],
    info:[]
  })

 EduEnEdicion:any;

  constructor(
    private eduService: EduService,
    private eduf: FormBuilder,
    public modalEd:NgbModal,
    private tokenService: TokenService
    
    ) {}

  edu: any;
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
    this.eduService.educa().subscribe((data) => {
      this.edu = data;
    });

  }

  saveEd(){
     
    const edu = this.formularioEd.value;

    // console.log('edu en edic es: ' + this.EduEnEdicion)
    // console.log("edu es: " + edu);
    if (this.EduEnEdicion) {
      // console.log("eduenedic es: " +this.EduEnEdicion);
      // console.log("edu es: " + edu);
      edu.id=   this.EduEnEdicion.id;
      this.eduService.update( this.EduEnEdicion.id, edu).subscribe(
        { 
          next: ()  => {
            this.getAll();
            this.formularioEd.setValue({
              titulo:'',
              institucion:'',
              img:'',
              info:'',
            });
            this.EduEnEdicion= undefined;
            this.modalEd.dismissAll();
            alert('Se edito con exito...!!!');
        }, 
        error: () =>{
          this.modalEd.dismissAll();
          alert('No se pudo editar esta educacion');
        }
      })

    }else{
      // console.log("estoy en el create");
      this.eduService.create(edu).subscribe(
        {
          next: ()  => {
            this.getAll();
            this.modalEd.dismissAll();
            alert('Se agrego con Exito...!!!');
            
           
        }, 
        error: () =>{
          this.modalEd.dismissAll();
          alert('vuelve a intentarlo ya que no se cargo la educación.');
          
        }
      })
      
    }
  }



editEd(id:number , contenidoEd:any){
  function encontrarObjetoPorId(objetos: any[], id: number) {
    for (let i = 0; i < objetos.length; i++) {
      if (objetos[i].id === id) {
        return objetos[i];
      }
    }
    return null; // Si no se encuentra ningún objeto con el ID especificado, devuelve null
  }

  const EduEncontrada = encontrarObjetoPorId(this.edu, id);

  this.EduEnEdicion = EduEncontrada;

  this.formularioEd.setValue({

    titulo: EduEncontrada.titulo,
    institucion: EduEncontrada.institucion,
    img: EduEncontrada.img,
    info: EduEncontrada.info,
  }
  )

  this.modalEd.open(contenidoEd);
}

resetForm(){
  
  this.formularioEd.setValue({
    titulo:'',
    institucion:'',
    img:'',
    info:'',
})}

ModalOpen2(contenidoEd:any){ 
  this.modalEd.open(contenidoEd);
  this.resetForm();
  this.EduEnEdicion= undefined;
}

  delete(id:number){
    this.eduService.delete(id).subscribe(()=>{
      this.getAll();
      console.log("BORRADO");
      alert('El elemento fue eliminado...!!!');

    }) ;
  };
}

