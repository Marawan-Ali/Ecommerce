import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [
    CurrencyPipe,
    LowerCasePipe,
    OnsalePipe,
    FilterPipe,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(
    private product: ProductsService,
    private cart: CartService,
    private toastr: ToastrService
  ) {}
  searchValue: string = '';
  productList: Products[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.product.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
    });
  }

  addProduct(id: string) {
    this.cart.addProduct(id).subscribe({
      next: (res) => {
        this.cart.cartNumber.set(res.numOfCartItems);
        this.toastr.success(res.message, 'success');
      },
    });
  }
}
