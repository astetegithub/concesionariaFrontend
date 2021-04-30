import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Cliente } from '../shared/models/cliente';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {

  cliente: Cliente = new Cliente();


  constructor(public authService: AuthService, private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getCliente(this.authService.cliente.id).subscribe(
      cliente => this.cliente = cliente
    );
  }

}
