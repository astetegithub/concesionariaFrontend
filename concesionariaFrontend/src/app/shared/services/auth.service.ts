import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../models/cliente';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _cliente: Cliente;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get cliente(): Cliente {
    if (this._cliente != null) {
      return this._cliente;
    } else if (this._cliente == null && sessionStorage.getItem('cliente') != null) {
      this._cliente = JSON.parse(sessionStorage.getItem('cliente')) as Cliente;
      return this._cliente;
    }

    return new Cliente();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }

    return null;
  }


  login(cliente: Cliente) {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + 'autos123');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic ' + credenciales});

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', cliente.usuario);
    params.set('password', cliente.password);

    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }

  guardarCliente(accessToken: string): void {

    const payload = this.obtenerDatosToken(accessToken);
    this._cliente = new Cliente();

    this._cliente.nombre = payload.nombre;
    this._cliente.apellidoA = payload.apellido;
    this._cliente.id = payload.id;

    sessionStorage.setItem('cliente', JSON.stringify(this._cliente));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);

    if (payload != null /*&& payload.user_name && payload.user_name.lenght > 0*/) {
      return true;
    }
    return false;
  }


  logOut(): void {
    this._cliente = null;
    this._token = null;

    sessionStorage.clear();
    this.router.navigate(['/inicio']);
  }

  public isNotAutorizado(e): boolean {
    if (e.status === 401 || e.status === 403) {
      this.router.navigate(['/cliente/login']);
      return true;
    }
    return false;
}
}
