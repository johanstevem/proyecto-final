import { Component, OnInit } from "@angular/core";
import { ComentarioService } from "src/app/core/services/api/comentario.service";
import { UsuarioService } from "src/app/core/services/api/usuario.service";
import { Comentario } from "src/app/core/interfaces/api/comentario.interface";
import { Usuario } from "src/app/core/interfaces/api/usuario.interface";

@Component({
  selector: "app-comentarioList",
  templateUrl: "./comentarioList.component.html",
  styleUrls: ["./comentarioList.component.scss"],
})
export class ComentarioListComponent implements OnInit {
  nuevoComentario: Comentario = {
    contenido: "",
    usuario_id: 0,
  };

  comentarios: Comentario[] = []; // Lista de comentarios
  usuarios: Usuario[] = []; // Lista de usuarios

  mostrarNotificacion = false;

  constructor(
    private comentarioService: ComentarioService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerComentarios();
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

  // Obtener todos los comentarios
  obtenerComentarios(): void {
    this.comentarioService.getAllComentarios().subscribe(
      (comentarios) => {
        this.comentarios = comentarios;
      },
      (error) => console.error(error)
    );
  }

  // Crear el comentario
  crearComentario(): void {
    this.comentarioService.createComentario(this.nuevoComentario).subscribe(
      (response) => {
        // Mostrar la notificación de éxito
        this.mostrarNotificacion = true;
        // Limpiar el formulario
        this.limpiarFormulario();
        // Volver a cargar los comentarios
        this.obtenerComentarios();
      },
      (error) => {
        console.error("Error al crear el comentario:", error);
      }
    );
  }

  // Limpiar el formulario
  limpiarFormulario(): void {
    this.nuevoComentario = {
      contenido: "",
      usuario_id: 0,
    };
  }

  cerrarNotificacion(): void {
    this.mostrarNotificacion = false;
  }
}
