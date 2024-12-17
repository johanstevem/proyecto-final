import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ServicioService } from "src/app/core/services/api/servicio.service";
import { HabitacionService } from "src/app/core/services/api/habitacion.service";
import { UsuarioService } from "src/app/core/services/api/usuario.service";
import { Servicio } from "src/app/core/interfaces/api/servicio.interface";
import { Habitacion } from "src/app/core/interfaces/api/habitacion.interface";
import { Usuario } from "src/app/core/interfaces/api/usuario.interface";
import Swal from "sweetalert2";

declare var bootstrap: any;

@Component({
  selector: "app-servicio",
  templateUrl: "./servicio.component.html",
  styleUrls: ["./servicio.component.scss"],
})
export class ServicioComponent implements OnInit {
  // Servicio para crear uno nuevo
  nuevoServicio: Servicio = {
    nombre: "",
    descripcion: "",
    precio: 0,
    usuario_id: 0,
    habitacion_id: 0,
  };

  // Servicios disponibles (simulados)
  serviciosDisponibles = [
    { nombre: "Servicio Básico", precio: 100 },
    { nombre: "Servicio Premium", precio: 200 },
    { nombre: "Servicio Deluxe", precio: 300 },
  ];

  usuarios: Usuario[] = [];
  habitaciones: Habitacion[] = [];
  servicios: Servicio[] = []; // Lista de servicios guardados
  filtro: string = "";

  // Servicio actual para editar
  servicioActual: Servicio = {
    nombre: "",
    descripcion: "",
    precio: 0,
    usuario_id: 0,
    habitacion_id: 0,
    id: 0,
  };

  @ViewChild("editModalElement") editModalElement!: ElementRef;
  editModalInstance: any;

  constructor(
    private servicioService: ServicioService,
    private habitacionService: HabitacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerHabitaciones();
    this.obtenerServicios();
  }

  ngAfterViewInit(): void {
    this.editModalInstance = new bootstrap.Modal(
      this.editModalElement.nativeElement,
      {}
    );
  }

  obtenerUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => console.error(error)
    );
  }

  obtenerHabitaciones(): void {
    this.habitacionService.getAllHabitaciones().subscribe(
      (habitaciones) => {
        this.habitaciones = habitaciones;
      },
      (error) => console.error(error)
    );
  }

  obtenerServicios(): void {
    // Aquí asumiendo que el método getAllServicios obtiene todos los servicios
    this.servicioService.getAllServicios().subscribe(
      (servicios) => {
        this.servicios = servicios;
      },
      (error) => console.error(error)
    );
  }

  actualizarPrecio(event: any): void {
    const servicioSeleccionado = this.serviciosDisponibles.find(
      (serv) => serv.nombre === event.target.value
    );
    if (servicioSeleccionado) {
      this.nuevoServicio.precio = servicioSeleccionado.precio;
    }
  }

  actualizarPrecioEdit(event: any): void {
    const servicioSeleccionado = this.serviciosDisponibles.find(
      (serv) => serv.nombre === event.target.value
    );
    if (servicioSeleccionado) {
      this.servicioActual.precio = servicioSeleccionado.precio;
    }
  }

  crearServicio(): void {
    this.servicioService.createServicio(this.nuevoServicio).subscribe(
      (response) => {
        this.obtenerServicios();
        this.limpiarFormulario();
        Swal.fire("Creado", "El servicio se creó correctamente", "success");
      },
      (error) => {
        console.error("Error al crear el servicio:", error);
        Swal.fire("Error", "No se pudo crear el servicio", "error");
      }
    );
  }

  limpiarFormulario(): void {
    this.nuevoServicio = {
      nombre: "",
      descripcion: "",
      precio: 0,
      usuario_id: 0,
      habitacion_id: 0,
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

  get serviciosFiltrados(): Servicio[] {
    if (!this.filtro.trim()) {
      return this.servicios;
    }
    const lowerFilter = this.filtro.toLowerCase();
    return this.servicios.filter(
      (serv) =>
        serv.nombre.toLowerCase().includes(lowerFilter) ||
        serv.descripcion.toLowerCase().includes(lowerFilter)
    );
  }

  openEditModal(servicio: Servicio): void {
    this.servicioActual = { ...servicio };
    this.editModalInstance.show();
  }

  closeEditModal(): void {
    this.editModalInstance.hide();
  }

  actualizarServicio(): void {
    if (!this.servicioActual.id) return;
    this.servicioService
      .updateServicio(this.servicioActual.id, this.servicioActual)
      .subscribe(
        (response) => {
          this.obtenerServicios();
          this.closeEditModal();
          Swal.fire(
            "Actualizado",
            "El servicio se actualizó correctamente",
            "success"
          );
        },
        (error) => {
          console.error("Error al actualizar el servicio:", error);
          Swal.fire("Error", "No se pudo actualizar el servicio", "error");
        }
      );
  }

  confirmDeleteServicio(id?: number): void {
    if (!id) return;
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará el servicio de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarServicio(id);
      }
    });
  }

  eliminarServicio(id: number): void {
    this.servicioService.deleteServicio(id).subscribe(
      (response) => {
        this.obtenerServicios();
        Swal.fire("Eliminado", "El servicio ha sido eliminado", "success");
      },
      (error) => {
        console.error("Error al eliminar el servicio:", error);
        Swal.fire("Error", "No se pudo eliminar el servicio", "error");
      }
    );
  }
}
