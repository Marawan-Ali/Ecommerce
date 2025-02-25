import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get(`${BaseURL.baseURL}/brands`);
  }
}
