import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Edificio } from '../shared/models/edificio';
import { ClienteService } from '../shared/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.component.html'
})
export class EdificioComponent implements OnInit {

  edificio: Edificio = new Edificio();
  confirmacion: boolean;
  constructor(public autthService: AuthService, private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
  }

  saveDireccionEdificio() {
    const id = this.autthService.cliente.id;
    this.edificio.setCliente = id;
    this.clienteService.saveDireccionEdificio(this.edificio).subscribe();
    this.confirmacion = true;
  }

}
