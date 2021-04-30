import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/models/cliente';
import { ClienteService } from '../shared/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
  }

  registro(): void {
   this.clienteService.registro(this.cliente).subscribe(
     response => this.router.navigate(['/inicio'])
   );
  }

}
