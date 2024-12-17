import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Usuario } from "../../interfaces/api/usuario.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl: string = `${environment.apiUrl}/auth`;

  constructor(private _httpClient: HttpClient, private router: Router) {}

  // Método para realizar login
  public login(correo: string, contrasena: string): Observable<any> {
    const endpoint = `${this.apiUrl}/login`;
    return this._httpClient.post(endpoint, { correo, contrasena });
  }

  // Método para cerrar sesión
  public logout(): Observable<any> {
    const endpoint = `${this.apiUrl}/logout`;

    const token = this.getToken(); // Obtiene el token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Agrega el token en los headers
    });

    return this._httpClient.post(endpoint, {}, { headers }); // Envía el token en los headers
  }

  // Guardar token en localStorage
  public setToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  // Obtener token desde localStorage
  public getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  // Eliminar token
  public clearToken(): void {
    localStorage.removeItem("authToken");
  }

  // Redirigir según rol
  public redirectByRole(rol: string): void {
    if (rol === "empleado") {
      this.router.navigate(["/servicio"]);
    } else if (rol === "administrador") {
      this.router.navigate(["/admin"]);
    }
  }

  // Obtener el perfil del usuario autenticado
  getPerfil(): Observable<Usuario> {
    return this._httpClient.get<Usuario>(this.apiUrl);
  }

  // Actualizar el perfil del usuario
  actualizarPerfil(usuario: Usuario): Observable<Usuario> {
    return this._httpClient.put<Usuario>(this.apiUrl, usuario);
  }
}
