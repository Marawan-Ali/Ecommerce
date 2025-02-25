import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  productDetails!: Products;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductsService,
    private cart: CartService,
    private toastr: ToastrService
  ) {
    activatedRoute.params.subscribe((res) => {
      this.id = res['id'];
    });
  }

  ngOnInit(): void {
    this.getSpecificProduct();
  }

  getSpecificProduct() {
    this.product.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    });
  }

  addProduct(id: string) {
    this.cart.addProduct(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'success');
      },
    });
  }
}
