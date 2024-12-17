export interface Comentario {
  id?: number; // Opcional porque se genera en el backend
  contenido: string; // El contenido del comentario
  usuario_id: number; // El ID del usuario que hace el comentario
  created_at?: string; // Opcional, fecha de creación (asignada por el backend)
  updated_at?: string; // Opcional, fecha de actualización (asignada por el backend)
  usuario?: {
    // Relación con el usuario (opcional si se devuelve junto con el comentario)
    id: number;
    nombre: string;
    apellido: string;
  };
}
