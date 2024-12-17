import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/core/services/api/auth.service";  // Asegúrate de que la ruta sea correcta
import { Usuario } from "src/app/core/interfaces/api/usuario.interface"; 

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  usuario: Usuario | undefined; // Almacena los datos del usuario

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Inicializa el formulario
    this.perfilForm = this.fb.group({
      nombre: [""],
      apellido: [""],
      telefono: [""],
    });
  }

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.authService.getPerfil().subscribe(
      (data) => {
        this.usuario = data;
        this.perfilForm.patchValue(this.usuario); // Cargar los datos en el formulario
      },
      (error) => {
        console.error("Error al cargar perfil", error);
      }
    );
  }

  onSubmit() {
    if (this.perfilForm.valid) {
      this.authService.actualizarPerfil(this.perfilForm.value).subscribe(
        (response) => {
          console.log("Perfil actualizado", response);
        },
        (error) => {
          console.error("Error al actualizar perfil", error);
        }
      );
    }
  }
}
