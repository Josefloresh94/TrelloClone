import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Product } from '../../models/product';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { BtnComponent } from '../../components/btn/btn.component';
import { NgClass } from '@angular/common';
import { DataSourceProduct } from './data-source';
import { ColumnConfig } from '../../models/column-config';
@Component({
  selector: 'app-table',
  imports: [CdkTableModule, ReactiveFormsModule, BtnComponent, NgClass],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit{
  dataSource = new DataSourceProduct();
  columns: string[] = ['#No', 'Name', 'price', 'cover', 'actions'];
  columnConfig: ColumnConfig[] = [
    { name: '#No', header: 'Id.', field: 'id', type: 'text' },
    { name: 'Name', header: 'Title', field: 'title', type: 'text' },
    { name: 'price', header: 'Price', field: 'price', type: 'text', showTotal: true },
    { name: 'cover', header: 'Cover', field: 'images', type: 'image' },
    { name: 'actions', header: 'Actions', field: '', type: 'action' }
  ];
  total = 0;
  totalItems = 0;
  input = new FormControl('', { nonNullable: true });

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe(data => {
      this.dataSource.init(data);
      this.updateTotals();
      this.cdr.markForCheck();
    })

    this.input.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.dataSource.find(value);
      this.updateTotals();
      this.cdr.markForCheck();
    });
  }

  updateTotals(): void {
    this.total = this.dataSource.getTotal();
    this.totalItems = this.dataSource.getTotalItems();
  }

  update(product: Product) {
    this.dataSource.update(product.id, { price: 20 });
    this.updateTotals();
    this.cdr.markForCheck();
  }

  // sortData(property: keyof Product): void {
  //   // Toggle sort direction if clicking the same column again
  //   const currentSortColumn = this.sortColumn;
  //   this.sortAscending = property === currentSortColumn ? !this.sortAscending : true;
  //   this.sortColumn = property;
  //   this.dataSource.sort(property, this.sortAscending);
  //   this.cdr.markForCheck();
  // }

  // // Track sort state
  // sortColumn: keyof Product | null = null;
  // sortAscending = true;
}
