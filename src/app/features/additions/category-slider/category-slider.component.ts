import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../shared/interface/products';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule, NgFor],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
})
export class CategorySliderComponent implements OnInit {
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

  categoryList: Category[] = [];

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.category.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
    });
  }
}
