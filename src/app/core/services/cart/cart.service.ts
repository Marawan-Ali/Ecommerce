import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../constant/baseURL';
import { isPlatformBrowser } from '@angular/common';
import { Payload } from '../../../shared/interface/payload';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  token: any;

  cartNumber: WritableSignal<number> = signal(0);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id: Object) {
    if (isPlatformBrowser(Id)) {
      this.token = { token: localStorage.getItem('userToken') || '' };
    }

  }

ngOnInit(): void {
  this.getProduct().subscribe({
    next: (res) => {
      this.cartNumber.set(res.numOfCartItems);
    },
  });
}

  addProduct(productId: string): Observable<any> {
    return this.http.post(`${BaseURL.baseURL}/cart`, { productId: productId });
  }
  getProduct(): Observable<any> {
    return this.http.get(`${BaseURL.baseURL}/cart`);
  }
  updateProduct(productId: string, count: number): Observable<any> {
    return this.http.put(`${BaseURL.baseURL}/cart/${productId}`, {
      count: count,
    });
  }
  removeProduct(productId: string): Observable<any> {
    return this.http.delete(`${BaseURL.baseURL}/cart/${productId}`);
  }
  clearProduct(): Observable<any> {
    return this.http.delete(`${BaseURL.baseURL}/cart`);
  }

  checkOut(cartId: any, payload: Payload): Observable<any> {
    return this.http.post(
      `${BaseURL.baseURL}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAdress: payload }
    );
  }

  getAllOrders(id: string): Observable<any> {
    return this.http.get(`${BaseURL.baseURL}/orders/user/${id}`);
  }
}
