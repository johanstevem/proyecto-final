import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Servicio } from "../../interfaces/api/servicio.interface";
import { environment } from "src/environments/environment";
import {
  ApiResponse,
  ApiData,
} from "../../interfaces/api/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class ServicioService {
  private apiUrl: string = `${environment.apiUrl}/servicio`;

  constructor(private _httpClient: HttpClient) {}

  // Obtener los headers con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Crear un nuevo servicio
  public createServicio(
    servicio: Partial<Servicio>
  ): Observable<ApiResponse<ApiData<Servicio>>> {
    const endpoint = `${this.apiUrl}/post`;
    return this._httpClient.post<ApiResponse<ApiData<Servicio>>>(
      endpoint,
      servicio,
      { headers: this.getAuthHeaders() }
    );
  }

  // Obtener todos los servicios
  public getAllServicios(): Observable<Servicio[]> {
    const endpoint = `${this.apiUrl}/get-all`;
    return this._httpClient.get<Servicio[]>(endpoint, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtener un servicio por su ID
  public getServicioById(id: number): Observable<Servicio> {
    const endpoint = `${this.apiUrl}/get-one/${id}`;
    return this._httpClient.get<Servicio>(endpoint, {
      headers: this.getAuthHeaders(),
    });
  }

  // Actualizar un servicio por su ID
  public updateServicio(
    id: number,
    servicio: Servicio
  ): Observable<ApiResponse<ApiData<Servicio>>> {
    const endpoint = `${this.apiUrl}/put/${id}`;
    return this._httpClient.put<ApiResponse<ApiData<Servicio>>>(
      endpoint,
      servicio,
      { headers: this.getAuthHeaders() }
    );
  }

  // Eliminar un servicio por su ID
  public deleteServicio(id: number): Observable<ApiResponse<ApiData<null>>> {
    const endpoint = `${this.apiUrl}/delete/${id}`;
    return this._httpClient.delete<ApiResponse<ApiData<null>>>(endpoint, {
      headers: this.getAuthHeaders(),
    });
  }
}
