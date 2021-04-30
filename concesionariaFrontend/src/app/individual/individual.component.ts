import { Component, OnInit } from '@angular/core';
import { Individual } from '../shared/models/individual';
import { AuthService } from '../shared/services/auth.service';
import { ClienteService } from '../shared/services/cliente.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html'
})
export class IndividualComponent implements OnInit {

  individual: Individual = new Individual();
  confirmacion: boolean;

  constructor(public autthService: AuthService, private clienteService: ClienteService) { }

  ngOnInit() {
  }

  saveDireccionIndividual() {
    const id = this.autthService.cliente.id;
    this.individual.setCliente = id;
    this.clienteService.saveDireccionIndividual(this.individual).subscribe();
    this.confirmacion = true;
  }

}
