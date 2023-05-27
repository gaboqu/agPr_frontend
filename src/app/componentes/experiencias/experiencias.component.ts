import { Component, ElementRef, OnInit, TemplateRef, ViewChild,  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpService } from 'src/app/servicios/exp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css'],
})
export class ExperienciasComponent implements OnInit{
  
  // public exp:ExpService[]=[];
  public editExp:ExpService | undefined;

  formulario:FormGroup = this.fb.group({
    empresa:[],
    fechas_ing_egr:[],
    funciones:[],
    url_logo_exp:[]
  })


  ExpEnEdicion:any;
  // experi: any;

  constructor(
    private expService: ExpService,
    private fb: FormBuilder,
    public modal:NgbModal,
    private tokenService: TokenService
    
    ) {}

  exp: any;
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
    this.expService.exper().subscribe((data) => {
      this.exp = data;
    });

  }

  save(){
     
    const exp = this.formulario.value; 
    console.log(exp);

    if (this.ExpEnEdicion) {
      exp.id=   this.ExpEnEdicion.id;
      this.expService.update( this.ExpEnEdicion.id, exp).subscribe(
        { 
          next: ()  => {
            
            this.getAll();
            this.formulario.setValue({
              url_logo_exp:'',
              empresa:'',
              fechas_ing_egr:'',
              funciones:'',
              
            });
            this.ExpEnEdicion= undefined;
            this.modal.dismissAll();
            alert('Se edito con exito...!!!');
        }, 
        error: () =>{
          this.modal.dismissAll();
          alert('No se pudo editar');
        }
      })

    }else{
      console.log("estoy en el create");
      this.expService.create(exp).subscribe(
        {
          next: ()  => {
            this.getAll();
            this.modal.dismissAll();
            alert('Se agrego con Exito...!!!');
            
           
        }, 
        error: () =>{
          this.modal.dismissAll();
          alert('vuelve a intentarlo ya que no se cargo la experiencia.');
          
        }
      })
      
    }
  }



edit(id:number , contenido:any){
  function encontrarObjetoPorId(objetos: any[], id: number) {
    for (let i = 0; i < objetos.length; i++) {
      if (objetos[i].id === id) {
        return objetos[i];
      }
    }
    return null; // Si no se encuentra ningún objeto con el ID especificado, devuelve null
  }

  const objetoEncontrado = encontrarObjetoPorId(this.exp, id);

  this.ExpEnEdicion = objetoEncontrado;

  this.formulario.setValue({

    empresa: objetoEncontrado.empresa,
    fechas_ing_egr: objetoEncontrado.fechas_ing_egr,
    funciones: objetoEncontrado.funciones,
    url_logo_exp: objetoEncontrado.url_logo_exp,
  }
  )

  this.modal.open(contenido);
  
  // alert("la id pasada es: " + this.ExpEnEdicion.id);
  // alert("este es el objeto completo: " + this.ExpEnEdicion);
}

resetForm(){
  
  this.formulario.setValue({
    url_logo_exp:'',
    empresa:'',
    fechas_ing_egr:'',
    funciones:'',
})}

ModalOpen(contenido:any){ 
  this.modal.open(contenido);
  this.resetForm();
  this.ExpEnEdicion= undefined;
}

  delete(id:number){
    this.expService.delete(id).subscribe(()=>{
      this.getAll();
      console.log("BORRADO");
      alert('El elemento fue eliminado...!!!');

    }) ;
  };
}




