import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Factura } from "../../interfaces/api/factura.interface.";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FacturaService {
  private apiUrl: string = `${environment.apiUrl}/factura`;

  constructor(private _httpClient: HttpClient) {}

  // Crear una nueva factura
  public createFactura(factura: Factura): Observable<Factura> {
    const endpoint = `${this.apiUrl}/post`;
    return this._httpClient.post<Factura>(endpoint, factura);
  }

  // Obtener todas las facturas
  public getAllFacturas(): Observable<Factura[]> {
    const endpoint = `${this.apiUrl}/get-factura-all`;
    return this._httpClient.get<Factura[]>(endpoint);
  }

  // Obtener una factura por su ID
  public getFacturaById(id: number): Observable<Factura> {
    const endpoint = `${this.apiUrl}/get-one/${id}`;
    return this._httpClient.get<Factura>(endpoint);
  }

  // Actualizar una factura por su ID
  public updateFactura(id: number, factura: Factura): Observable<Factura> {
    const endpoint = `${this.apiUrl}/put/${id}`;
    return this._httpClient.put<Factura>(endpoint, factura);
  }

  // Eliminar una factura por su ID
  public deleteFactura(id: number): Observable<any> {
    const endpoint = `${this.apiUrl}/delete/${id}`;
    return this._httpClient.delete<any>(endpoint);
  }
}
