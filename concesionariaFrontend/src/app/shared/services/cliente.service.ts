import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';
import { Edificio } from '../models/edificio';
import { Individual } from '../models/individual';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private registroUrl = 'http://localhost:8080/cliente/registro';
  private saveDireccionEdificioUrl = 'http://localhost:8080/cliente/direccion/edificio';
  private saveDireccionIndividualUrl = 'http://localhost:8080/cliente/direccion/individual';
  private datosCliente = 'http://localhost:8080/cliente/cuenta';


  constructor(private http: HttpClient, private authService: AuthService) { }

  private agregarAuthorizationHeader() {

  const token = this.authService.token;

  if (token != null) {
    return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  }
  return this.httpHeaders;
}

  registro(cliente: Cliente) {
    return this.http.post<Cliente>(this.registroUrl, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  saveDireccionEdificio(direccion: Edificio) {
    return this.http.post<Edificio>(this.saveDireccionEdificioUrl, direccion, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        console.log(e);
        return throwError(e);
      }
      )
    );
  }

  saveDireccionIndividual(direccion: Individual) {
    return this.http.post<Individual>(this.saveDireccionIndividualUrl, direccion, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        console.log(e);
        return throwError(e);
      }
      )
    );
  }

  getCliente(id: number) {
    return this.http.get<Cliente>(`${this.datosCliente}/${id}`, {headers: this.agregarAuthorizationHeader()});
  }
}
