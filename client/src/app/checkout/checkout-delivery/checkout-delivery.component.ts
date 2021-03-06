import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/IDeliveryMethod';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,) {
     }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
      this.basketService.setShippingPrice(this.deliveryMethods[1]);
    }, error => {
      console.log(error);
    });
  }

  setShippingPrice(deliveryMethods: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethods);
  }



}
