import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if(this.quantity > 1) { this.quantity--; }
  }

  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(product => {
        this.product = product;
      }, error => {
        console.log(error);
      });
  }

}
