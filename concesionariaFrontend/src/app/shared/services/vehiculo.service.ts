import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Vehiculo } from '../models/vehiculo';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  private getVehiculoUrl: string = "http://localhost:8080/inicio/vehiculo";
  private getAllVehiculosUrl: string = "http://localhost:8080/inicio/vehiculos";
  private favoritoUrl: string = "http://localhost:8080/inicio/favoritos";
  private descuentosUrl: string = "http://localhost:8080/inicio/descuentos";
  private coloresUrl: string = "http://localhost:8080/inicio/colores";
  private solicitudUrl: string = "http://localhost:8080/inicio/solicitud";


  constructor(private http: HttpClient, private authService: AuthService) { }

  private agregarAuthorizationHeader() {

    const token = this.authService.token;

    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getVehiculo(id: number) {
    return this.http.get<Vehiculo>(`${this.getVehiculoUrl}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNotAutorizado(e);
        return throwError(e);
      })
    );
  }

  getVehiculos() {
    return this.http.get<Vehiculo[]>(this.getAllVehiculosUrl);
  }

  eliminarFavorito(idVehiculo: number, idCliente: number) {
    return this.http.delete(`${this.favoritoUrl}/${idVehiculo}/${idCliente}`, {headers: this.agregarAuthorizationHeader()});
  }

  agregarFavorito(idVehiculo: number, idCliente: number) {
    return this.http.get(`${this.favoritoUrl}/${idVehiculo}/${idCliente}`, {headers: this.agregarAuthorizationHeader()});
  }

  getDescuentos() {
    return this.http.get<Vehiculo[]>(this.descuentosUrl, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        this.authService.isNotAutorizado(e);
        return throwError(e);
      })
    );
  }

  getDescuento(descuento: number) {
    return this.http.get<Vehiculo[]>(`${this.descuentosUrl}/${descuento}`, { headers: this.agregarAuthorizationHeader() });
  }

  coloresVehiculo(idCliente: number) {
    return this.http.get<Color[]>(`${this.coloresUrl}/${idCliente}`, {headers: this.agregarAuthorizationHeader()});
  }

  solicitud(idVehiculo: number, idCliente: number) {
    return this.http.get(`${this.solicitudUrl}/${idVehiculo}/${idCliente}`, {headers: this.agregarAuthorizationHeader()});
  }

}
