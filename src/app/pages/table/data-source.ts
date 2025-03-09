import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from './../../models/product';

export class DataSourceProduct extends DataSource<Product> {

  private data = new BehaviorSubject<Product[]>([]);
  private originalData: Product[] = [];

  connect(collectionViewer: CollectionViewer): Observable<readonly Product[]> {
    return this.data.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.data.complete();
  }

  init(products: Product[]) {
    this.originalData = [...products];
    this.data.next(products);
  }

  getAll(): Product[] {
    return this.data.getValue();
  }

  getTotal(): number {
    const products = this.data.getValue();
    return products
      .map(item => item.price)
      .reduce((total, price) => total + price, 0);
  }

  getTotalItems(): number {
    return this.data.getValue().length;
  }

  update(id: Product['id'], changes: Partial<Product>): void {
    const products = this.data.getValue();
    const productIndex = products.findIndex(item => item.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...changes,
      };
      this.data.next([...products]); // Create a new array to ensure change detection
    }
  }

  find(query: string): void {
    if (!query.trim()) {
      // If query is empty, restore original data
      this.data.next([...this.originalData]);
      return;
    }

    const newProducts = this.originalData
      .filter(item => {
        const searchText = `${item.id}-${item.title}-${item.price}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });
    this.data.next(newProducts);
  }

  sort(property: keyof Product, ascending = true): void {
    const products = [...this.data.getValue()];
    products.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      const comparison = ascending ?
        (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) :
        (valueA > valueB ? -1 : valueA < valueB ? 1 : 0);

      return comparison;
    });

    this.data.next(products);
  }
}
