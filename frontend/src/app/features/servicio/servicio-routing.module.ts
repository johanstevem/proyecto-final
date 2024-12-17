import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServicioComponent } from "./pages/servicio/servicio.component";
const routes: Routes = [
  {
    path: "servicio",
    component: ServicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioRoutingModule {}
