export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena?: string; // La contraseña es opcional para evitar exponerla en lecturas.
  telefono: string;
  rol_id: number;
}
