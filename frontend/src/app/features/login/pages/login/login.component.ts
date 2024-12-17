import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/api/auth.service"; 

import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;

      this.authService.login(correo, contrasena).subscribe(
        (response) => {
          // Guardar el token en localStorage
          this.authService.setToken(response.token);

          // Verificar que el rol existe antes de acceder
          const rol = response.usuario?.rol?.nombre_rol;

          if (rol) {
            this.authService.redirectByRole(rol);
          } else {
            this.errorMessage = "No se pudo determinar el rol del usuario.";
          }
        },
        (error) => {
          this.errorMessage = "Credenciales incorrectas. Inténtalo de nuevo.";
        }
      );
    }
  }
}
