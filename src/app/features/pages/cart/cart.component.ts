import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Cart } from '../../../shared/interface/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  cartList: Cart[] = [];
  cartId!: string;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    return this.cart.getProduct().subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cartId = res.cartId;
        this.cart.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  updateCart(productId: string, count: number) {
    return this.cart.updateProduct(productId, count).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cart.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  removeCart(productId: string) {
    return this.cart.removeProduct(productId).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cart.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  clearCart() {
    return this.cart.clearProduct().subscribe({
      next: (res) => {
        this.getCart();
      },
    });
  }
}
