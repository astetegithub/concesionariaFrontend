import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private urlEndPoint = 'http://localhost:8080/inicio/buscador';

  constructor(private http: HttpClient) { }

  buscador(tipo: string, condicion: string, precioMinimo: string,
           precioMaximo: string, kmMinimo: string, kmMaximo: string) {
    return this.http.get<Vehiculo[]>(`${this.urlEndPoint}/${tipo}/${condicion}/${precioMinimo}/${precioMaximo}/
                                      ${kmMinimo}/${kmMaximo}`);
  }

}
