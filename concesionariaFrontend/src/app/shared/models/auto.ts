import { Vehiculo } from './vehiculo';

export class Auto extends Vehiculo {
    combustible: string;
    numeropuertas: number;
    constructor(combustible: string, numeropuertas: number) {
        super();
        this.combustible = combustible;
        this.numeropuertas = numeropuertas;
    }
}
