import {Imagen} from './imagen';
import { Marca} from './marca';
export class Vehiculo {
    idVehiculo: number;
    precio: number;
    condicion: string;
    anioCreacion: number;
    kilometraje: number;
    stock: number;
    descripcion: string;
    imagenes: Imagen[];
    marca: Marca;
    descuento: number;
    tipoVehiculo: string;
    precioDescuento: number;
}
