import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComentarioListComponent } from "./pages/comentario/comentarioList.component";

const routes: Routes = [
  {
    path: "comentarioList",
    component: ComentarioListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentarioListRoutingModule {}
