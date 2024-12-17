import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComentarioListRoutingModule } from "./comentarioList-routing.module";
import { ComentarioListComponent } from "./pages/comentario/comentarioList.component";

@NgModule({
  declarations: [ComentarioListComponent],
  imports: [CommonModule, ComentarioListRoutingModule, FormsModule],
})
export class ComentarioListModule {}
