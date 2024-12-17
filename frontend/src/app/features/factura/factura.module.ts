import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FacturaRoutingModule } from "./factura-routing.module";
import { FacturaComponent } from "./pages/factura/factura.component";

@NgModule({
  declarations: [FacturaComponent],
  imports: [CommonModule, FacturaRoutingModule, FormsModule],
})
export class FacturaModule {}
