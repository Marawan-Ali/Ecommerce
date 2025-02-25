import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(`${BaseURL.baseURL}/categories`);
  }
}
