import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  componentActive = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  displayCode: boolean;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    // This will be picked up by our effect and if we successfully get products from our server, these will be added to the store.
    this.store.dispatch(new productActions.Load());
    // Listen to the store and select this product state
    this.products$ = this.store.pipe(select(fromProduct.getProducts));

    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe((showProductCode) => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
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
}
