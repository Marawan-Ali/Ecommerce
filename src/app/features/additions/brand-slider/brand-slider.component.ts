import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../shared/interface/products';
import { BrandService } from '../../../core/services/brands/brand.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-brand-slider',
  imports: [CarouselModule, NgFor],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.scss',
})
export class BrandSliderComponent implements OnInit {
  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
      1280: {
        items: 8,
      },
    },
    nav: true,
    autoplay: true,
  };

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
