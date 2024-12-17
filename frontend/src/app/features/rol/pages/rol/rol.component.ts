import { Component, OnInit } from "@angular/core";
import { RolService } from "src/app/core/services/api/rol.service";
import { Rol } from "src/app/core/interfaces/api/rol.interface";
import Swal from "sweetalert2";

@Component({
  selector: "app-rol",
  templateUrl: "./rol.component.html",
  styleUrls: ["./rol.component.scss"],
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = { nombre_rol: "" }; // Objeto para almacenar el rol nuevo

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.getRoles(); // Obtener lista de roles al iniciar el componente
  }

  // Método para obtener todos los roles
  getRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error("Error al obtener los roles:", error);
        Swal.fire("Error", "No se pudieron obtener los roles", "error");
      }
    );
  }

  // Método para crear un rol
  onSubmit(): void {
    this.rolService.createRol(this.rol).subscribe(
      (response) => {
        this.getRoles(); // Actualizar la lista después de crear
        this.rol.nombre_rol = ""; // Limpiar el campo
        Swal.fire("Creado", "El rol se creó correctamente", "success");
      },
      (error) => {
        console.error("Error al crear el rol:", error);
        Swal.fire("Error", "No se pudo crear el rol", "error");
      }
    );
  }

  // Método para actualizar un rol (si fuera necesario, se agregaría swal igual)
  onUpdate(id: number, rol: Rol): void {
    if (id && rol) {
      this.rolService.updateRol(id, rol).subscribe(
        (response) => {
          this.getRoles(); // Actualizar la lista después de actualizar
          Swal.fire(
            "Actualizado",
            "El rol se actualizó correctamente",
            "success"
          );
        },
        (error) => {
          console.error("Error al actualizar el rol:", error);
          Swal.fire("Error", "No se pudo actualizar el rol", "error");
        }
      );
    } else {
      console.error("ID o datos del rol no válidos");
    }
  }

  // Mostrar alerta de confirmación antes de eliminar
  confirmDeleteRole(id: number): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el rol de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDelete(id);
      }
    });
  }

  // Método para eliminar un rol
  onDelete(id: number): void {
    this.rolService.deleteRol(id).subscribe(
      (response) => {
        this.getRoles(); // Actualizar la lista después de eliminar
        Swal.fire("Eliminado", "El rol ha sido eliminado", "success");
      },
      (error) => {
        console.error("Error al eliminar el rol:", error);
        Swal.fire("Error", "No se pudo eliminar el rol", "error");
      }
    );
  }
}
