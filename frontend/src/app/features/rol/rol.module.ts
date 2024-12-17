import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RolRoutingModule } from './rol-routing.module';

import { RolComponent } from './pages/rol/rol.component';

@NgModule({
  declarations: [
    RolComponent,
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    FormsModule
  ]
})
export class RolModule { }
