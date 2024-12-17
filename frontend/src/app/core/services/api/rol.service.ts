import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rol } from "../../interfaces/api/rol.interface";
import { environment } from "src/environments/environment";
import { ApiData, ApiResponse } from "../../interfaces/api/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class RolService {
  private apiUrl: string = `${environment.apiUrl}/rol`;

  constructor(private _httpClient: HttpClient) {}

  public createRol(rol: object): Observable<ApiResponse<ApiData<Rol>>> {
    const endpoint = `${this.apiUrl}/post`;
    return this._httpClient.post<ApiResponse<ApiData<Rol>>>(endpoint, rol);
  }

  public getAllRoles(): Observable<Rol[]> {
    const endpoint = `${this.apiUrl}/get-all`;
    return this._httpClient.get<Rol[]>(endpoint); // Cambia el tipo de la respuesta
  }

  public updateRol(
    id: number,
    rol: Rol
  ): Observable<ApiResponse<ApiData<Rol>>> {
    const endpoint = `${this.apiUrl}/put/${id}`;
    return this._httpClient.put<ApiResponse<ApiData<Rol>>>(endpoint, rol);
  }

  public deleteRol(id: number): Observable<ApiResponse<ApiData<null>>> {
    const endpoint = `${this.apiUrl}/delete/${id}`;
    return this._httpClient.delete<ApiResponse<ApiData<null>>>(endpoint);
  }
}
