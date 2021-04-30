import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Cliente } from '../shared/models/cliente';
import {ClienteService} from '../shared/services/cliente.service';
import { Edificio } from '../shared/models/edificio';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html'
})
export class CuentaComponent implements OnInit {

  cliente: Cliente = new Cliente();
  edificio: Edificio;

  constructor(public authService: AuthService, private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getCliente(this.authService.cliente.id).subscribe(
      cliente => this.cliente = cliente
    );
  }

}
