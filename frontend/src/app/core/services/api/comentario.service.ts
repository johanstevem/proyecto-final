import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comentario } from "../../interfaces/api/comentario.interface"; 
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ComentarioService {
  private apiUrl: string = `${environment.apiUrl}/comentario`;

  constructor(private _httpClient: HttpClient) {}

  // Crear un nuevo comentario
  public createComentario(comentario: Comentario): Observable<Comentario> {
    const endpoint = `${this.apiUrl}/post`;
    return this._httpClient.post<Comentario>(endpoint, comentario);
  }

  // Obtener todos los comentarios
  public getAllComentarios(): Observable<Comentario[]> {
    const endpoint = `${this.apiUrl}/get-comentario-all`;
    return this._httpClient.get<Comentario[]>(endpoint);
  }

  // Obtener los comentarios de un usuario específico
  public getComentariosByUsuario(usuarioId: number): Observable<Comentario[]> {
    const endpoint = `${this.apiUrl}/get-comentario-usuario/${usuarioId}`;
    return this._httpClient.get<Comentario[]>(endpoint);
  }

  // Actualizar un comentario
  public updateComentario(
    id: number,
    comentario: Comentario
  ): Observable<Comentario> {
    const endpoint = `${this.apiUrl}/put/${id}`;
    return this._httpClient.put<Comentario>(endpoint, comentario);
  }

  // Eliminar un comentario
  public deleteComentario(id: number): Observable<void> {
    const endpoint = `${this.apiUrl}/delete/${id}`;
    return this._httpClient.delete<void>(endpoint);
  }
  
}
