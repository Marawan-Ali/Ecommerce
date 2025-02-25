import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent implements OnInit {
  allOrders: any[] = [];

  constructor(private cart: CartService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.cart.getAllOrders(this.auth.userData().id).subscribe({
      next: (res) => {
        this.allOrders = res;
      },
    });
  }
}
