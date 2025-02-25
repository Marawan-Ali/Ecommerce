import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/layout/navbar/navbar.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FooterComponent } from './features/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgxSpinnerComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Ecommerce';
}
