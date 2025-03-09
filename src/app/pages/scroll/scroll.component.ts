import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll',
  imports: [ ScrollingModule, CommonModule],
  templateUrl: './scroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {
  products: Product[] = [];

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.cdr.markForCheck();
    });
  }
}
