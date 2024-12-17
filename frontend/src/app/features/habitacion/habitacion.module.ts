import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HabitacionComponent } from "./pages/habitacion/habitacion.component";
import { RouterModule } from "@angular/router";
import { HabitacionRoutingModule } from "./habitacion-routing.module";

@NgModule({
  declarations: [HabitacionComponent],
  imports: [
    CommonModule,
    HabitacionRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
})
export class HabitacionModule {}
