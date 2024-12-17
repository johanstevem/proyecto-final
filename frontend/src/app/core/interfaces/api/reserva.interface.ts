export interface Reserva {
[x: string]: any;
  id?: number;
  usuario_id: number;
  habitacion_id: number;
  cantidad_personas: number;
  cantidad_noches: number;
  monto_total: number;
  codigo_reserva: string;
  created_at?: string; // Opcional, asignado por el backend
  updated_at?: string; // Opcional, asignado por el backend
}
