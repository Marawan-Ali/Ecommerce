import { Component } from '@angular/core';
import { BrandService } from '../../../core/services/brands/brand.service';
import { Brand } from '../../../shared/interface/products';
import { BrandSliderComponent } from '../../additions/brand-slider/brand-slider.component';

@Component({
  selector: 'app-brands',
  imports: [BrandSliderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  brandList: Brand[] = [];

  constructor(private brand: BrandService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brand.getAllBrands().subscribe({
      next: (res) => {
        this.brandList = res.data;
      },
    });
  }
}
