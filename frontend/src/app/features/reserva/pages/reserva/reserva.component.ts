import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ReservaService } from "src/app/core/services/api/reserva.service";
import { HabitacionService } from "src/app/core/services/api/habitacion.service";
import { UsuarioService } from "src/app/core/services/api/usuario.service";
import { Reserva } from "src/app/core/interfaces/api/reserva.interface";
import { Habitacion } from "src/app/core/interfaces/api/habitacion.interface";
import { Usuario } from "src/app/core/interfaces/api/usuario.interface";
import Swal from "sweetalert2";

declare var bootstrap: any;

@Component({
  selector: "app-reserva",
  templateUrl: "./reserva.component.html",
  styleUrls: ["./reserva.component.scss"],
})
export class ReservaComponent implements OnInit {
  nuevaReserva: Reserva = {
    usuario_id: 0,
    habitacion_id: 0,
    cantidad_personas: 0,
    cantidad_noches: 0,
    monto_total: 0,
    codigo_reserva: "",
  };

  usuarios: Usuario[] = [];
  habitaciones: Habitacion[] = [];
  reservas: Reserva[] = [];

  filtro: string = "";

  // Reserva actual para editar
  reservaActual: Reserva = {
    usuario_id: 0,
    habitacion_id: 0,
    cantidad_personas: 0,
    cantidad_noches: 0,
    monto_total: 0,
    codigo_reserva: "",
    id: 0,
  };

  @ViewChild("editModalElement") editModalElement!: ElementRef;
  editModalInstance: any;

  constructor(
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerHabitaciones();
    this.obtenerReservas();
  }

  ngAfterViewInit(): void {
    this.editModalInstance = new bootstrap.Modal(
      this.editModalElement.nativeElement,
      {}
    );
  }

  // Obtener todos los usuarios
  obtenerUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => console.error(error)
    );
  }

  // Obtener todas las habitaciones
  obtenerHabitaciones(): void {
    this.habitacionService.getAllHabitaciones().subscribe(
      (habitaciones) => {
        this.habitaciones = habitaciones;
      },
      (error) => console.error(error)
    );
  }

  // Obtener todas las reservas
  obtenerReservas(): void {
    this.reservaService.getAllReservas().subscribe(
      (reservas) => {
        this.reservas = reservas;
      },
      (error) => console.error(error)
    );
  }

  crearReserva(): void {
    this.reservaService.createReserva(this.nuevaReserva).subscribe(
      (response) => {
        Swal.fire("Creado", "La reserva se creó correctamente", "success");
        this.obtenerReservas();
        this.limpiarFormulario();
      },
      (error) => {
        console.error("Error al crear la reserva:", error);
        Swal.fire("Error", "No se pudo crear la reserva", "error");
      }
    );
  }

  limpiarFormulario(): void {
    this.nuevaReserva = {
      usuario_id: 0,
      habitacion_id: 0,
      cantidad_personas: 0,
      cantidad_noches: 0,
      monto_total: 0,
      codigo_reserva: "",
    };
  }

  getUsuarioName(id: number): string {
    const usuario = this.usuarios.find((u) => u.id === id);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido";
  }

  getHabitacionName(id: number): string {
    const hab = this.habitaciones.find((h) => h.id === id);
    return hab ? `${hab.nombre} (${hab.numero})` : "Desconocida";
  }

  get reservasFiltradas(): Reserva[] {
    if (!this.filtro.trim()) {
      return this.reservas;
    }
    const lowerFilter = this.filtro.toLowerCase();
    return this.reservas.filter(
      (res) =>
        res.codigo_reserva.toLowerCase().includes(lowerFilter) ||
        this.getUsuarioName(res.usuario_id).toLowerCase().includes(lowerFilter)
    );
  }

  openEditModal(reserva: Reserva): void {
    this.reservaActual = { ...reserva };
    this.editModalInstance.show();
  }

  closeEditModal(): void {
    this.editModalInstance.hide();
  }

  actualizarReserva(): void {
    if (!this.reservaActual.id) return;
    this.reservaService
      .updateReserva(this.reservaActual.id, this.reservaActual)
      .subscribe(
        (response) => {
          this.obtenerReservas();
          this.closeEditModal();
          Swal.fire(
            "Actualizado",
            "La reserva se actualizó correctamente",
            "success"
          );
        },
        (error) => {
          console.error("Error al actualizar la reserva:", error);
          Swal.fire("Error", "No se pudo actualizar la reserva", "error");
        }
      );
  }

  confirmDeleteReserva(id?: number): void {
    if (!id) return;
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará la reserva de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarReserva(id);
      }
    });
  }

  eliminarReserva(id: number): void {
    this.reservaService.deleteReserva(id).subscribe(
      (response) => {
        this.obtenerReservas();
        Swal.fire("Eliminado", "La reserva ha sido eliminada", "success");
      },
      (error) => {
        console.error("Error al eliminar la reserva:", error);
        Swal.fire("Error", "No se pudo eliminar la reserva", "error");
      }
    );
  }
}
