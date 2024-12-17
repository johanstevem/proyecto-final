export interface Factura {
  id?: number; // Opcional porque puede no existir cuando se crea
  reserva_id: number;
  servicio_id: number;
  habitacion_id: number;
  usuario_id: number;
  codigo_factura: string;
  created_at?: string; // Opcional, para cuando se devuelve desde el backend
  updated_at?: string; // Opcional, para cuando se devuelve desde el backend
}
