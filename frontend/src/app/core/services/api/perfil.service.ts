import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../../interfaces/api/usuario.interface";

@Injectable({
  providedIn: "root",
})
export class PerfilService {
  private apiUrl: string = `${environment.apiUrl}/auth/perfil`;

  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario autenticado
  getPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl);
  }

  // Actualizar el perfil del usuario
  actualizarPerfil(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl, usuario);
  }
}
