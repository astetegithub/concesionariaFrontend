import { Direccion } from './direccion';
import { Vehiculo } from './vehiculo';

export class Cliente {
    id: number;
    usuario: string;
    email: string;
    password: string;
    nombre: string;
    apellidoA: string;
    apellidoB: string;
    direcciones: Direccion[] = [];
    solicitudes: Vehiculo[] = [];
    vehiculosFav: Vehiculo[] = [];
}
