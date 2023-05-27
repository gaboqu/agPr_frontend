import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent  implements OnInit{

  public edtiPersona:PersonaService | undefined;

  formularioPer:FormGroup  = this.per.group({
    nombre:[],
    url_foto:[],
    descripcion:[],
    // email:[],
    // password:[],
    frase1:[],
    frase2:[]
  })

  // [x: string]: any; 
  PerEnEdicion:any;



  constructor(private personaService: PersonaService, 
    private tokenService: TokenService, 
    private router:Router,
    private per: FormBuilder,
    public modalP:NgbModal
    ) { }


    persona: any;
    isLogged= false;

  ngOnInit(): void{

    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged = false;
    }
    this.getP();

  }

  getP(){
    this.personaService.person().subscribe(data => {
      this.persona = data;
  
    });
  }

    onLogOut():void{
      this.tokenService.logOut();
      window.location.reload();
    }

    login(){
      this.router.navigate(['/login'])
    }

    save(){
      // alert("estoy en el save")
      const persona = this.formularioPer.value;  
      // if (this.PerEnEdicion) {
        persona.id=   1;
        this.personaService.update( persona.id, persona).subscribe(
          { 
            next: ()  => {
              
              this.getP();
              this.formularioPer.setValue({
                nombre:'',
                url_foto:'',
                descripcion:'',
                frase1:'',
                frase2:'',
                
              });
              this.PerEnEdicion= undefined;
              this.modalP.dismissAll();
              alert('Se edito con exito...!!!');
          }, 
          error: () =>{
            this.modalP.dismissAll();
            alert('No se pudo editar');
          }
        })
  
      // }else{
      //   console.log("estoy en el create");
      //   this.personaService.create(persona).subscribe(
      //     {
      //       next: ()  => {
      //         // this.getAll();
      //         this.modalP.dismissAll();
      //         alert('Se agrego con Exito...!!!');
              
             
      //     }, 
      //     error: () =>{
      //       this.modalP.dismissAll();
      //       alert('vuelve a intentarlo ya que no se cargo la experiencia.');
            
      //     }
      //   })
        
      // }
    }
  

    editb(id:number , contenido2:any){
      // console.log("este es el id pasado " + this.PerEnEdicion);
      // function encontrarObjetoPorId(objetos: any[], id: number) {
      //   for (let i = 0; i < objetos.length; i++) {
      //     if (objetos[i].id === id) {
      //       return objetos[i];
      //     }
      //   }
      //   return null; // Si no se encuentra ningún objeto con el ID especificado, devuelve null
      // }
    
      // const objetoEncontrado = encontrarObjetoPorId(this.persona, id);
    
      // this.PerEnEdicion = objetoEncontrado;
    
      this.formularioPer.setValue({
    
        nombre: this.persona[0].nombre,
        url_foto: this.persona[0].url_foto,
        descripcion: this.persona[0].descripcion,
        frase1: this.persona[0].frase1,
        frase2: this.persona[0].frase2,
      }
      )
      
      this.modalP.open(contenido2);
      
      // console.log("la id pasada es: " + this.ExpEnEdicion.id);
      // console.log("este es el objeto completo: " + this.ExpEnEdicion);
    }

    

    ModalOpen(contenido2:any){ 
      this.modalP.open(contenido2);
      // this.resetForm();
      //this.PerEnEdicion= undefined;
    }

  
  }
