import { Component } from "@angular/core";
import { AuthService } from "src/app/core/services/api/auth.service";

@Component({
  selector: "app-navbar", // O el componente donde coloques el botón
  templateUrl: "./navbar.component.html", // O el template del componente
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
  }
}
