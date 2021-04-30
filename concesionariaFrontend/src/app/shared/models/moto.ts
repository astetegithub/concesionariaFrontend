import { Vehiculo } from './vehiculo';

export class Moto extends Vehiculo {
    cilindrada: number;

    constructor(cilindrada: number) {
        super();
        this.cilindrada = cilindrada;
    }
}
