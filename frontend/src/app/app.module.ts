// app.module.ts
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from "./app-routing.module";

// for HttpClient import:
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
// for Router import:
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
// for Core import:
import { LoadingBarModule } from "@ngx-loading-bar/core";
// for Redux use:



import { AppComponent } from "./app.component";

import { OverlayModule } from "@angular/cdk/overlay";


import { RolModule } from "./features/rol/rol.module";
import { HomeModule } from "./features/home/home.module";
import { RegistroModule } from "./features/registro/registro.module";
import { LoginModule } from "./features/login/login.module";
import { PerfilModule } from "./features/perfil/perfil.module";
import { HabitacionModule } from "./features/habitacion/habitacion.module";
import { AdminModule } from "./features/admin/admin.module";
import { ServicioModule } from "./features/servicio/servicio.module";
import { FacturaModule } from "./features/factura/factura.module";
import { ReservaModule } from "./features/reserva/reserva.module";
import { ComentarioModule } from "./features/comentario/comentario.module";
import { ComentarioListModule } from "./features/comentario-list/comentarioList.module";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    AppRoutingModule,
    HttpClientModule,
    RolModule,
    HomeModule,
    RegistroModule,
    LoginModule,
    PerfilModule,
    HabitacionModule,
    AdminModule,
    ServicioModule,
    FacturaModule,
    ReservaModule,
    ComentarioModule,
    ComentarioListModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // for HttpClient use:
    LoadingBarHttpClientModule,
    // for Router use:
    LoadingBarRouterModule,
    // for Core use:
    LoadingBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
