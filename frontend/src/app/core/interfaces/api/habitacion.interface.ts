export interface Habitacion {
  id?: number; // opcional porque puede no existir cuando se crea
  nombre: string;
  descripcion: string;
  precio: number;
  numero: number;
  disponible: boolean;
}
