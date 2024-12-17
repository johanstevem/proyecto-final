import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HabitacionService } from "src/app/core/services/api/habitacion.service";
import { Habitacion } from "src/app/core/interfaces/api/habitacion.interface";
import { AuthService } from "src/app/core/services/api/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

declare var bootstrap: any;

@Component({
  selector: "app-habitacion",
  templateUrl: "./habitacion.component.html",
  styleUrls: ["./habitacion.component.scss"],
})
export class HabitacionComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  habitacionActual: Habitacion = {
    nombre: "",
    descripcion: "",
    precio: 0,
    numero: 0,
    disponible: false,
  };
  isEditMode = false;

  @ViewChild("modal") modalElement!: ElementRef;
  modalInstance: any;

  constructor(
    private habitacionService: HabitacionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(
      this.modalElement.nativeElement,
      {}
    );
  }

  obtenerHabitaciones(): void {
    this.habitacionService.getAllHabitaciones().subscribe(
      (habitaciones) => (this.habitaciones = habitaciones),
      (error) => console.error(error)
    );
  }

  // Abrir modal en modo creación
  openCreateModal(): void {
    this.isEditMode = false;
    this.habitacionActual = {
      nombre: "",
      descripcion: "",
      precio: 0,
      numero: 0,
      disponible: false,
    };
    this.modalInstance.show();
  }

  // Abrir modal en modo edición
  openEditModal(habitacion: Habitacion): void {
    this.isEditMode = true;
    this.habitacionActual = { ...habitacion };
    this.modalInstance.show();
  }

  closeModal(): void {
    this.modalInstance.hide();
  }

  onSubmitHabitacion(): void {
    if (this.isEditMode && this.habitacionActual.id) {
      // Actualizar
      this.habitacionService
        .updateHabitacion(this.habitacionActual.id, this.habitacionActual)
        .subscribe(
          () => {
            this.obtenerHabitaciones();
            this.closeModal();
            Swal.fire(
              "Actualizado",
              "La habitación se actualizó correctamente",
              "success"
            );
          },
          (error) => {
            console.error(error);
            Swal.fire("Error", "No se pudo actualizar la habitación", "error");
          }
        );
    } else {
      // Crear
      this.habitacionService.createHabitacion(this.habitacionActual).subscribe(
        () => {
          this.obtenerHabitaciones();
          this.closeModal();
          Swal.fire("Creado", "La habitación se creó correctamente", "success");
        },
        (error) => {
          console.error(error);
          Swal.fire("Error", "No se pudo crear la habitación", "error");
        }
      );
    }
  }

  confirmDeleteHabitacion(id: number): void {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará la habitación de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarHabitacion(id);
      }
    });
  }

  eliminarHabitacion(id: number): void {
    this.habitacionService.deleteHabitacion(id).subscribe(
      () => {
        this.obtenerHabitaciones();
        Swal.fire("Eliminado", "La habitación ha sido eliminada", "success");
      },
      (error) => {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar la habitación", "error");
      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.authService.clearToken();
        this.router.navigate(["/login"]);
      },
      (error) => console.error(error)
    );
  }
}
