import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReservaRoutingModule } from "./reserva-routing.module";

import { ReservaComponent } from "./pages/reserva/reserva.component";

@NgModule({
  declarations: [ReservaComponent],
  imports: [CommonModule, ReservaRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ReservaModule {}
