import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyService } from 'src/app/servicios/proy.service';
import { TokenService } from 'src/app/servicios/token.service';
// import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  public editProy:ProyService | any;

  formularioPr:FormGroup = this.prof.group({
    img: [],
    url:[],
    titulo: [],
    tecnologias: [],
    info:[]
  })

  PrEnEdicion:any;

  constructor(
    private proyService: ProyService,
    private prof: FormBuilder,
    public modalPr:NgbModal,
    private tokenService: TokenService
    
    ) {}

  proy: any;
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
    this.proyService.proyec().subscribe((data) => {
      this.proy = data;
    });

  }

  savePr(){
     
    const proy = this.formularioPr.value;

    // console.log('Proyecto en edic es: ' + this.PrEnEdicion)
    // console.log("Proyecto es: " + proy);
    if (this.PrEnEdicion) {
      // console.log("eduenedic es: " +this.EduEnEdicion);
      // console.log("edu es: " + edu);
      proy.id=   this.PrEnEdicion.id;
      this.proyService.update( this.PrEnEdicion.id, proy).subscribe(
        { 
          next: ()  => {
            this.getAll();
            this.formularioPr.setValue({
              img: '',
              url:'',
              titulo: '',
              tecnologias: '',
              info:''
            });
            this.PrEnEdicion= undefined;
            this.modalPr.dismissAll();
            alert('Se edito con exito...!!!');
        }, 
        error: () =>{
          this.modalPr.dismissAll();
          alert('No se pudo editar este Proyecto');
        }
      })

    }else{
      // console.log("estoy en el create");
      this.proyService.create(proy).subscribe(
        {
          next: ()  => {
            this.getAll();
            this.modalPr.dismissAll();
            alert('Se agrego con Exito...!!!');
            
           
        }, 
        error: () =>{
          this.modalPr.dismissAll();
          alert('vuelve a intentarlo ya que no se cargo la educación.');
          
        }
      })
      
    }
  }



editP(id:number , contenidoPr:any){
  function encontrarObjetoPorId(objetos: any[], id: number) {
    for (let i = 0; i < objetos.length; i++) {
      if (objetos[i].id === id) {
        return objetos[i];
      }
    }
    return null; // Si no se encuentra ningún objeto con el ID especificado, devuelve null
  }

  const PrEncontrada = encontrarObjetoPorId(this.proy, id);

  this.PrEnEdicion = PrEncontrada;

  this.formularioPr.setValue({

    img: PrEncontrada.img,
    url: PrEncontrada.url,
    titulo: PrEncontrada.titulo,
    tecnologias: PrEncontrada.tecnologias,
    info: PrEncontrada.info,
  }
  )

  this.modalPr.open(contenidoPr);
}

resetForm(){
  
  this.formularioPr.setValue({
    img: '',
    url:'',
    titulo: '',
    tecnologias: '',
    info:''
})}

ModalOpen4(contenidoPr:any){ 
  this.modalPr.open(contenidoPr);
  this.resetForm();
  this.PrEnEdicion= undefined;
}

  delete(id:number){
    console.log("La id pasada es: " + id);
    this.proyService.delete(id).subscribe(()=>{
      this.getAll();
      console.log("BORRADO");
      alert('El elemento fue eliminado...!!!');

    }) ;
  };



}
