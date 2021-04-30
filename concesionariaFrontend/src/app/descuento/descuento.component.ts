import { Component, OnInit } from '@angular/core';
import { Vehiculo} from '../shared/models/vehiculo';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import {VehiculoService} from '../shared/services/vehiculo.service'

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.component.html'
})
export class DescuentoComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  descuento: number;

  constructor(private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const descuento = params.descuento;
      this.descuento = descuento;
      this.vehiculoService.getDescuento(descuento).pipe(
        tap(vehiculos => {
          vehiculos.forEach(vehiculo => {
            const valorDescuento: number = vehiculo.descuento / 100 * vehiculo.precio;
            vehiculo.precioDescuento = vehiculo.precio - valorDescuento;
          }
          );
        }
      )).subscribe(
        vehiculos => this.vehiculos = vehiculos
      );
    });
  }


}
