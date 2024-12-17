import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FacturaService } from "src/app/core/services/api/factura.service";
import { HabitacionService } from "src/app/core/services/api/habitacion.service";
import { UsuarioService } from "src/app/core/services/api/usuario.service";
import { ServicioService } from "src/app/core/services/api/servicio.service";
import { ReservaService } from "src/app/core/services/api/reserva.service";
import { Factura } from "src/app/core/interfaces/api/factura.interface.";
import { Habitacion } from "src/app/core/interfaces/api/habitacion.interface";
import { Usuario } from "src/app/core/interfaces/api/usuario.interface";
import { Servicio } from "src/app/core/interfaces/api/servicio.interface";
import { Reserva } from "src/app/core/interfaces/api/reserva.interface";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

declare var bootstrap: any;

@Component({
  selector: "app-factura",
  templateUrl: "./factura.component.html",
  styleUrls: ["./factura.component.scss"],
})
export class FacturaComponent implements OnInit {
  nuevaFactura: Factura = {
    reserva_id: 0,
    servicio_id: 0,
    habitacion_id: 0,
    usuario_id: 0,
    codigo_factura: "",
  };

  facturas: Factura[] = [];
  usuarios: Usuario[] = [];
  habitaciones: Habitacion[] = [];
  reservas: Reserva[] = [];
  servicios: Servicio[] = [];

  filtro: string = "";

  facturaActual: Factura = {
    reserva_id: 0,
    servicio_id: 0,
    habitacion_id: 0,
    usuario_id: 0,
    codigo_factura: "",
    id: 0,
  };

  @ViewChild("editModalElement") editModalElement!: ElementRef;
  editModalInstance: any;

  constructor(
    private facturaService: FacturaService,
    private habitacionService: HabitacionService,
    private usuarioService: UsuarioService,
    private reservaService: ReservaService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerHabitaciones();
    this.obtenerReservas();
    this.obtenerServicios();
    this.obtenerFacturas();
  }

  ngAfterViewInit(): void {
    this.editModalInstance = new bootstrap.Modal(
      this.editModalElement.nativeElement,
      {}
    );
  }

  // Obtener datos
  obtenerUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      (usuarios: Usuario[]) => (this.usuarios = usuarios),
      (error: any) => console.error(error)
    );
  }

  obtenerHabitaciones(): void {
    this.habitacionService.getAllHabitaciones().subscribe(
      (habitaciones: Habitacion[]) => (this.habitaciones = habitaciones),
      (error: any) => console.error(error)
    );
  }

  obtenerReservas(): void {
    this.reservaService.getAllReservas().subscribe(
      (reservas: Reserva[]) => (this.reservas = reservas),
      (error: any) => console.error(error)
    );
  }

  obtenerServicios(): void {
    this.servicioService.getAllServicios().subscribe(
      (servicios: Servicio[]) => (this.servicios = servicios),
      (error: any) => console.error(error)
    );
  }

  obtenerFacturas(): void {
    this.facturaService.getAllFacturas().subscribe(
      (facturas: Factura[]) => (this.facturas = facturas),
      (error: any) => console.error(error)
    );
  }

  // Crear factura
  crearFactura(): void {
    this.facturaService.createFactura(this.nuevaFactura).subscribe(
      (response: any) => {
        Swal.fire("Creado", "La factura se creó correctamente", "success");
        this.obtenerFacturas();
        this.limpiarFormulario();
      },
      (error: any) => {
        console.error("Error al crear la factura:", error);
        Swal.fire("Error", "No se pudo crear la factura", "error");
      }
    );
  }

  limpiarFormulario(): void {
    this.nuevaFactura = {
      reserva_id: 0,
      servicio_id: 0,
      habitacion_id: 0,
      usuario_id: 0,
      codigo_factura: "",
    };
  }

  // Funciones helper para mostrar nombres en la tabla
  getUsuarioName(id: number): string {
    const usuario = this.usuarios.find((u) => u.id === id);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : "Desconocido";
  }

  getHabitacionName(id: number): string {
    const hab = this.habitaciones.find((h) => h.id === id);
    return hab ? `${hab.nombre} (${hab.numero})` : "Desconocida";
  }

  getServicioName(id: number): string {
    const serv = this.servicios.find((s) => s.id === id);
    return serv ? `${serv.nombre} (${serv.precio}$)` : "Desconocido";
  }

  // Filtrar facturas
  get facturasFiltradas(): Factura[] {
    if (!this.filtro.trim()) return this.facturas;
    const filtroLower = this.filtro.toLowerCase();
    return this.facturas.filter(
      (fac) =>
        fac.codigo_factura.toLowerCase().includes(filtroLower) ||
        this.getUsuarioName(fac.usuario_id).toLowerCase().includes(filtroLower)
    );
  }

  // Editar Factura
  openEditModal(factura: Factura): void {
    this.facturaActual = { ...factura };
    this.editModalInstance.show();
  }

  closeEditModal(): void {
    this.editModalInstance.hide();
  }

  actualizarFactura(): void {
    if (!this.facturaActual.id) return;
    this.facturaService
      .updateFactura(this.facturaActual.id, this.facturaActual)
      .subscribe(
        (response: any) => {
          this.obtenerFacturas();
          this.closeEditModal();
          Swal.fire(
            "Actualizado",
            "La factura se actualizó correctamente",
            "success"
          );
        },
        (error: any) => {
          console.error("Error al actualizar la factura:", error);
          Swal.fire("Error", "No se pudo actualizar la factura", "error");
        }
      );
  }

  // Eliminar Factura
  confirmDeleteFactura(id?: number): void {
    if (!id) return;
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará la factura de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarFactura(id);
      }
    });
  }

  eliminarFactura(id: number): void {
    this.facturaService.deleteFactura(id).subscribe(
      (response: any) => {
        this.obtenerFacturas();
        Swal.fire("Eliminado", "La factura ha sido eliminada", "success");
      },
      (error: any) => {
        console.error("Error al eliminar la factura:", error);
        Swal.fire("Error", "No se pudo eliminar la factura", "error");
      }
    );
  }

  // Generar PDF
  generarPDF(factura: Factura): void {
    const doc = new jsPDF();
    doc.text("Factura", 10, 10);
    doc.text(`Código de Factura: ${factura.codigo_factura}`, 10, 20);
    doc.text(`Reserva: #${factura.reserva_id}`, 10, 30);
    doc.text(`Servicio: ${this.getServicioName(factura.servicio_id)}`, 10, 40);
    doc.text(
      `Habitación: ${this.getHabitacionName(factura.habitacion_id)}`,
      10,
      50
    );
    doc.text(`Usuario: ${this.getUsuarioName(factura.usuario_id)}`, 10, 60);
    doc.save(`factura_${factura.codigo_factura}.pdf`);
  }
}
