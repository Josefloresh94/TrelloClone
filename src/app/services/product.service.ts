import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() {}

  getProducts() {
    const url = new URL(`https://api.escuelajs.co/api/v1/products`);
    return this.http.get<Product[]>(url.toString());
  }
}
