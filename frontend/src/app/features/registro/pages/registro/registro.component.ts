import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "src/app/core/services/api/usuario.service";
import { Router } from "@angular/router";
import { RolService } from "src/app/core/services/api/rol.service";
import { Rol } from "src/app/core/interfaces/api/rol.interface";
import { Usuario } from "src/app/core/interfaces/api/usuario.interface";

import Swal from "sweetalert2";

declare var bootstrap: any;

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  errorMessage: string = "";
  roles: Rol[] = [];
  usuarios: Usuario[] = [];
  filtro: string = "";
  isEditMode = false;
  currentUserId: number | null = null;

  @ViewChild("modal") modalElement!: ElementRef;
  modalInstance: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.maxLength(255)]],
      apellido: ["", [Validators.required, Validators.maxLength(255)]],
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", [Validators.required, Validators.minLength(8)]],
      telefono: ["", [Validators.required, Validators.maxLength(15)]],
      rol_id: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.getAllUsuarios();
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(
      this.modalElement.nativeElement,
      {}
    );
  }

  getRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => {
        console.error("Error al obtener los roles:", error);
      }
    );
  }

  getAllUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => {
        console.error("Error al obtener usuarios:", error);
      }
    );
  }

  getRolName(rol_id: number): string {
    const rol = this.roles.find((r) => r.id === rol_id);
    return rol ? rol.nombre_rol : "Desconocido";
  }

  // Propiedad para filtrar los usuarios
  get usuariosFiltrados(): Usuario[] {
    if (!this.filtro.trim()) {
      return this.usuarios;
    }
    const filtroLower = this.filtro.toLowerCase();
    return this.usuarios.filter(
      (user) =>
        user.nombre.toLowerCase().includes(filtroLower) ||
        user.apellido.toLowerCase().includes(filtroLower) ||
        user.correo.toLowerCase().includes(filtroLower)
    );
  }

  openModal(): void {
    this.isEditMode = false;
    this.currentUserId = null;
    this.registroForm.reset();
    this.registroForm
      .get("contrasena")
      ?.setValidators([Validators.required, Validators.minLength(8)]);
    this.registroForm.get("contrasena")?.updateValueAndValidity();
    this.modalInstance.show();
  }

  editUser(user: Usuario): void {
    this.isEditMode = true;
    this.currentUserId = user.id || null;
    this.registroForm.patchValue({
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      contrasena: "",
      telefono: user.telefono,
      rol_id: user.rol_id,
    });
    this.modalInstance.show();
  }

  closeModal(): void {
    this.modalInstance.hide();
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      if (this.isEditMode && this.currentUserId) {
        // Editar usuario
        const updatedUser: Usuario = {
          ...this.registroForm.value,
          id: this.currentUserId,
        };
        this.usuarioService
          .updateUsuario(this.currentUserId, updatedUser)
          .subscribe(
            (response) => {
              this.getAllUsuarios();
              this.closeModal();
              Swal.fire(
                "Actualizado",
                "El usuario se actualizó correctamente",
                "success"
              );
            },
            (error) => {
              this.errorMessage = "Error al actualizar el usuario.";
              Swal.fire("Error", "No se pudo actualizar el usuario", "error");
            }
          );
      } else {
        // Crear usuario
        this.usuarioService.createUsuario(this.registroForm.value).subscribe(
          (response) => {
            this.getAllUsuarios();
            this.closeModal();
            Swal.fire(
              "Creado",
              "El usuario se registró correctamente",
              "success"
            );
          },
          (error) => {
            this.errorMessage =
              "Error al registrar el usuario. Inténtalo de nuevo.";
            Swal.fire("Error", "No se pudo registrar el usuario", "error");
          }
        );
      }
    }
  }

  deleteUser(id?: number): void {
    if (!id) return;
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción eliminará el usuario de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).subscribe(
          (response) => {
            this.getAllUsuarios();
            Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
          },
          (error) => {
            this.errorMessage = "Error al eliminar el usuario.";
            Swal.fire("Error", "No se pudo eliminar el usuario", "error");
          }
        );
      }
    });
  }
}
