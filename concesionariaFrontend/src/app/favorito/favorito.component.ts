import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Cliente } from '../shared/models/cliente';
import { ClienteService } from '../shared/services/cliente.service';
import { VehiculoService } from '../shared/services/vehiculo.service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html'
})
export class FavoritoComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(public authService: AuthService, private router: Router,
              private clienteService: ClienteService, private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.clienteService.getCliente(this.authService.cliente.id).subscribe(
      cliente => this.cliente = cliente
    );
  }

  eliminarFavorito(idVehiculo: number, idCliente: number) {
    this.vehiculoService.eliminarFavorito(idVehiculo, idCliente).subscribe();
    this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(() =>
    this.router.navigate(['favorito']));
 }

}
