import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../shared/models/vehiculo';
import { VehiculoService } from '../shared/services/vehiculo.service';
import { Buscador } from '../shared/models/buscador';
import { BuscadorService } from '../shared/services/buscador.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  sinResultados: boolean;
  msjError: string;
  vehiculos: Vehiculo[] = [];
  filtrados: Vehiculo[] = [];
  buscadorObj: Buscador = new Buscador();
  selectPrecios: number[] = [];
  selectKm: number[] = [];
  selectTipo: string[] = [];
  selectCondicion: string[] = [];

  constructor(private vehiculoService: VehiculoService, private buscadorService: BuscadorService) { }

  ngOnInit() {

    this.vehiculoService.getVehiculos().pipe(
      tap(vehiculos => {
        vehiculos.forEach(vehiculo => {
          const precio: number = vehiculo.precio;
          if (!this.selectPrecios.includes(precio)) {
              this.selectPrecios.push(precio);
          }
          const kilometros: number = vehiculo.kilometraje;
          if (!this.selectKm.includes(kilometros)) {
               this.selectKm.push(kilometros);
          }
          const tipo: string = vehiculo.tipoVehiculo;
          if (!this.selectTipo.includes(tipo)) {
               this.selectTipo.push(tipo);
          }
          const condicion: string = vehiculo.condicion;
          if (!this.selectCondicion.includes(condicion)) {
               this.selectCondicion.push(condicion);
          }
        }
        );
        this.selectPrecios.sort(function compare(a, b) {
            return a - b;
        });
        this.selectKm.sort(function compare(a, b) {
          return a - b;
        });
      }
      )
    ).subscribe(
      vehiculos => this.vehiculos = vehiculos
   );
  }

  buscador(): void {

    const tipo = this.buscadorObj.tipo;
    const condicion = this.buscadorObj.condicion;
    const precioMinimo = this.buscadorObj.precioMinimo;
    const precioMaximo = this.buscadorObj.precioMaximo;
    const kmMinimo  = this.buscadorObj.kmMinimo;
    const kmMaximo = this.buscadorObj.kmMaximo;

    this.buscadorService.buscador(tipo, condicion, precioMinimo, precioMaximo, kmMinimo, kmMaximo).pipe(
      catchError(e => {
       console.log(e.status);
       if (e.status === 404) {
         this.sinResultados = true;
         this.msjError = e.error.mensaje;
         this.filtrados = [];
       }
       return throwError(e);
      })
    ).subscribe(
        vehiculos => this.filtrados = vehiculos
    );
    this.sinResultados = false;
  }

}
