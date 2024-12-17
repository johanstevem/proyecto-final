import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReservaComponent } from "./pages/reserva/reserva.component";

const routes: Routes = [
  {
    path: "reserva",
    component: ReservaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaRoutingModule {}
