import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/content.routes";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "rol",
    redirectTo: "rol",
  },
  {
    path: "registro",
    redirectTo: "registro",
  },
  {
    path: "login",
    redirectTo: "login",
  },
  {
    path: "perfil",
    redirectTo: "perfil",
  },
  {
    path: "habitacion",
    redirectTo: "habitacion",
  },
  {
    path: "admin",
    redirectTo: "admin",
  },
  {
    path: "servicio",
    redirectTo: "servicio",
  },
  {
    path: "factura",
    redirectTo: "factura",
  },
  {
    path: "reserva",
    redirectTo: "reserva",
  },
  {
    path: "comentario",
    redirectTo: "comentario",
  },
  {
    path: "comentarioList",
    redirectTo: "comentarioList",
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
