import { Component, OnInit } from '@angular/core';
import { Vehiculo} from '../shared/models/vehiculo';
import { tap } from 'rxjs/operators';
import { VehiculoService } from '../shared/services/vehiculo.service';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html'
})
export class DescuentosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  descuentos: number[] = [];

  constructor( private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.vehiculosEnDescuento();
  }


  private vehiculosEnDescuento(): void {
    this.vehiculoService.getVehiculos().pipe(
      tap(vehiculos => {
        vehiculos.forEach(vehiculo => {
          const descuento: number = vehiculo.descuento;
          if (!this.descuentos.includes(descuento)) {
              this.descuentos.push(descuento);
           }

          const valorDescuento: number = vehiculo.descuento / 100 * vehiculo.precio;
          vehiculo.precioDescuento = vehiculo.precio - valorDescuento;
          this.descuentos.sort(function compare(a, b) {
            return a - b;
          });
        }
        );
      }

      )
    ).subscribe(
       vehiculos => this.vehiculos = vehiculos
    );
  }

}
