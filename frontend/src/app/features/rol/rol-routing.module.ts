import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RolComponent } from './pages/rol/rol.component';


const routes: Routes = [
  {
    path: "rol",
    component: RolComponent,
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
