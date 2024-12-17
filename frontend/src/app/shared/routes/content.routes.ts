import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "rol",
    loadChildren: () =>
      import("../../features/rol/rol.module").then((m) => m.RolModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("../../features/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "registro",
    loadChildren: () =>
      import("../../features/registro/registro.module").then(
        (m) => m.RegistroModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("../../features/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("../../features/perfil/perfil.module").then((m) => m.PerfilModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../../features/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "servicio",
    loadChildren: () =>
      import("../../features/servicio/servicio.module").then(
        (m) => m.ServicioModule
      ),
  },
  {
    path: "factura",
    loadChildren: () =>
      import("../../features/factura/factura.module").then((m) => m.FacturaModule),
  },
  {
    path: "reserva",
    loadChildren: () =>
      import("../../features/reserva/reserva.module").then((m) => m.ReservaModule),
  },
  {
    path: "comentario",
    loadChildren: () =>
      import("../../features/comentario/comentario.module").then(
        (m) => m.ComentarioModule
      ),
  },
  {
    path: "comentarioList",
    loadChildren: () =>
      import("../../features/comentario-list/comentarioList.module").then(
        (m) => m.ComentarioListModule
      ),
  },
];
