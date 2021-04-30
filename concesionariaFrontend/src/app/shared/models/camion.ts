import { Vehiculo } from './vehiculo';

export class Camion extends Vehiculo {
    numeroAcoplados: number;
    cargaMaxima: number;

    constructor(numeroAcoplados: number,  cargaMaxima: number) {
        super();
        this.numeroAcoplados = numeroAcoplados;
        this.cargaMaxima = cargaMaxima;
    }
}
