import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfilRoutingModule } from "./perfil-routing.module";

import { PerfilComponent } from "./pages/perfil/perfil.component";

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PerfilModule {}
