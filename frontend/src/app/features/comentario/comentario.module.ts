import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComentarioRoutingModule } from "./comentario-routing.module";
import { ComentarioComponent } from "./pages/comentario/comentario.component";

@NgModule({
  declarations: [ComentarioComponent],
  imports: [CommonModule, ComentarioRoutingModule, FormsModule],
})
export class ComentarioModule {}
