import { Component, OnInit } from '@angular/core';
import { CategorySliderComponent } from '../../additions/category-slider/category-slider.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../shared/interface/products';

@Component({
  selector: 'app-categories',
  imports: [CategorySliderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
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
