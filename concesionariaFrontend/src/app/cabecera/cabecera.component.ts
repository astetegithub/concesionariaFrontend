import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html'
})
export class CabeceraComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logOut(): void {
    this.authService.logOut();
  }

}