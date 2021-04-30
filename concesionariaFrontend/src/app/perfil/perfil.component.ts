import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../shared/models/vehiculo';
import { VehiculoService } from '../shared/services/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Marca } from '../shared/models/marca';
import { Color } from '../shared/models/color';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  vehiculo: Vehiculo = new Vehiculo();
  img: string;
  colores: Color[] = [];
  confirmacion: boolean;
  msjConfirmacion: string;
  redireccion: string;

  constructor(private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute, public authService: AuthService) {

  }

  ngOnInit() {
    this.perfilVehiculo();
  }

  agregarFavorito(idVehiculo: number, idCliente: number) {
     this.vehiculoService.agregarFavorito(idVehiculo, idCliente).subscribe();
     this.msjConfirmacion = 'Se agrego a tu lista de favoritos';
     this.confirmacion = true;
     this.redireccion = 'favoritos';
  }

  solicitud(idVehiculo: number, idCliente: number) {
      this.vehiculoService.solicitud(idVehiculo, idCliente).subscribe();
      this.msjConfirmacion = 'Se envio la solicitud';
      this.confirmacion = true;
      this.redireccion = 'solicitudes';
  }

  perfilVehiculo() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.vehiculoService.coloresVehiculo(id).subscribe(colores =>{
        this.colores = colores;
      });

      this.vehiculoService.getVehiculo(id).subscribe(vehiculo => {
        this.vehiculo = vehiculo;
        this.img = vehiculo.imagenes[0].ubicacion;
      });
      this.vehiculo.marca = new Marca();
    });
  }
}
