import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HabitacionComponent } from "./pages/habitacion/habitacion.component";


const routes: Routes = [
  {
    path: "habitacion",
    component: HabitacionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitacionRoutingModule {}
