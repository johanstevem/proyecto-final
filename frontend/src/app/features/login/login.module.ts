import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./pages/login/login.component";
import { RouterModule } from "@angular/router";
import { LoginRoutingModule } from "./login-routing.module";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    LoginRoutingModule,
    ReactiveFormsModule, 
    RouterModule
  ],
})
export class LoginModule {}
