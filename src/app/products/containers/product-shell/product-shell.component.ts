import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../product';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  clearProduct(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }

  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }
}
