import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ServicioRoutingModule } from "./servicio-routing.module";
import { ServicioComponent } from "./pages/servicio/servicio.component";

@NgModule({
  declarations: [ServicioComponent],
  imports: [CommonModule, ServicioRoutingModule, FormsModule],
})
export class ServicioModule {}
