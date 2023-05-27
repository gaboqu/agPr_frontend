import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTypedJsModule } from 'ngx-typed-js';




import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { ExperienciasComponent } from './componentes/experiencias/experiencias.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { BaseComponent } from './componentes/base/base.component';
import { NavComponent } from './componentes/nav/nav.component';

 /* 
 TODO: Importo el router para luego definir las vistas con los componetes que se veran */
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interceptorProvider } from './servicios/interceptor-service';



@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    ExperienciasComponent,
    EducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    BaseComponent,
    NavComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgxTypedJsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  
    
/*  
TODO:Importo el router y definos las vistas cada una con su path, la que no tiene path es la vista por defecto. En este caso es BaseComponent
*/

    RouterModule.forRoot([
      
      {path: 'registro', component: RegistroComponent},
      {path: '', component: BaseComponent},
      {path: 'login', component: LoginComponent},
    ]

    )
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
