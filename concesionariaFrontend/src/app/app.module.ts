import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { DescuentosComponent } from './descuentos/descuentos.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule} from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { DescuentoComponent } from './descuento/descuento.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { FavoritoComponent } from './favorito/favorito.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { EdificioComponent } from './edificio/edificio.component';
import { IndividualComponent } from './individual/individual.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'descuentos', component: DescuentosComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'vehiculo/:id', component: PerfilComponent},
  {path: 'cliente/registro', component: RegistroComponent},
  {path: 'cliente/login', component: LoginComponent},
  {path: 'descuentos/:descuento', component: DescuentoComponent},
  {path: 'cuenta', component: CuentaComponent},
  {path: 'favorito', component: FavoritoComponent},
  {path: 'solicitudes', component: SolicitudesComponent},
  {path: 'direccion/edificio', component: EdificioComponent},
  {path: 'direccion/individual', component: IndividualComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DescuentosComponent,
    CabeceraComponent,
    InicioComponent,
    PerfilComponent,
    RegistroComponent,
    LoginComponent,
    DescuentoComponent,
    CuentaComponent,
    FavoritoComponent,
    SolicitudesComponent,
    EdificioComponent,
    IndividualComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
