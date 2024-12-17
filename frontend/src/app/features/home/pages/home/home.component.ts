import { Component } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  // Variable para almacenar la imagen actual
  currentImage: string = "assets/imagenes/home1.jpg";

  // Método para cambiar la imagen
  img(imagePath: string): void {
    this.currentImage = imagePath;
  }
}
