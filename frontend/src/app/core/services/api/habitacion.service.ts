import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Habitacion } from "../../interfaces/api/habitacion.interface";
import { environment } from "src/environments/environment";
import {
  ApiResponse,
  ApiData,
} from "../../interfaces/api/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class HabitacionService {
  private apiUrl: string = `${environment.apiUrl}/habitacion`;

  constructor(private _httpClient: HttpClient) {}

  // Función para obtener los headers con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken"); // O sessionStorage si prefieres
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Crear una nueva habitación
  public createHabitacion(
    habitacion: Partial<Habitacion>
  ): Observable<ApiResponse<ApiData<Habitacion>>> {
    const endpoint = `${this.apiUrl}/post`;
    return this._httpClient.post<ApiResponse<ApiData<Habitacion>>>(
      endpoint,
      habitacion,
      { headers: this.getAuthHeaders() } // Adjunta los headers con el token
    );
  }

  // Obtener todas las habitaciones
  public getAllHabitaciones(): Observable<Habitacion[]> {
    const endpoint = `${this.apiUrl}/get-all`;
    return this._httpClient.get<Habitacion[]>(endpoint, {
      headers: this.getAuthHeaders(), // Adjunta los headers con el token
    });
  }

  // Obtener una habitación por su ID
  public getHabitacionById(id: number): Observable<Habitacion> {
    const endpoint = `${this.apiUrl}/get-one/${id}`;
    return this._httpClient.get<Habitacion>(endpoint, {
      headers: this.getAuthHeaders(), // Adjunta los headers con el token
    });
  }

  // Actualizar una habitación por su ID
  public updateHabitacion(
    id: number,
    habitacion: Habitacion
  ): Observable<ApiResponse<ApiData<Habitacion>>> {
    const endpoint = `${this.apiUrl}/put/${id}`;
    return this._httpClient.put<ApiResponse<ApiData<Habitacion>>>(
      endpoint,
      habitacion,
      { headers: this.getAuthHeaders() } // Adjunta los headers con el token
    );
  }

  // Eliminar una habitación por su ID
  public deleteHabitacion(id: number): Observable<ApiResponse<ApiData<null>>> {
    const endpoint = `${this.apiUrl}/delete/${id}`;
    return this._httpClient.delete<ApiResponse<ApiData<null>>>(
      endpoint,
      {
        headers: this.getAuthHeaders(),
      } // Adjunta los headers con el token
    );
  }
}
