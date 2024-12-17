// reserva.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Reserva } from "src/app/core/interfaces/api/reserva.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reserva`;

  constructor(private http: HttpClient) {}

  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/get-all`);
  }

  createReserva(reserva: Reserva): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post`, reserva);
  }

  updateReserva(id: number, reserva: Reserva): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/put/${id}`, reserva);
  }

  deleteReserva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
