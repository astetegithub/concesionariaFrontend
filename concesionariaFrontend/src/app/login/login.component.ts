import { Component, OnInit } from '@angular/core';
import { Cliente } from '../shared/models/cliente';
import { AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  cliente: Cliente;

  constructor(public authService: AuthService, private router: Router) {
    this.cliente = new Cliente();
   }

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/inicio']);
    }
  }

  login(): void {
      this.authService.login(this.cliente).subscribe(response => {

        this.authService.guardarCliente(response.access_token);
        this.authService.guardarToken(response.access_token);

        const cliente = this.authService.cliente;

        this.router.navigate(['/descuentos']);

      }, error => {
         if (error.status === 400) {
           console.log('No esta registrado');
         }
      });
  }

}
