import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { HomeSliderComponent } from '../../additions/home-slider/home-slider.component';
import { CategorySliderComponent } from '../../additions/category-slider/category-slider.component';
import { BrandSliderComponent } from '../../additions/brand-slider/brand-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    ProductComponent,
    HomeSliderComponent,
    CategorySliderComponent,
    BrandSliderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
