import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  cartId!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cart: CartService
  ) {
    activatedRoute.params.subscribe({
      next: (res) => {
        this.cartId = res['id'];
      },
    });
  }

  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  submitForm() {
    this.cart.checkOut(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        window.location.href = res.session.url;
      },
    });
  }
}
