export class Direccion {

    idDireccion: number;
    provincia: string;
    ciudad: string;
    calle: string;
    altura: number;
    entreCalleA: string;
    entreCalleB: string;
    cliente: number;

    set setCliente(cliente: number) {
        this.cliente = cliente;
    }
}
