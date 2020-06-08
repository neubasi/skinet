import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastService } from 'src/app/core/toast/toast.service';
import { IBasket } from 'src/app/shared/models/IBasket';
import { IOrder } from 'src/app/shared/models/IOrder';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitOrder(){
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder)=> {
      this.toastService.show('SUCCESS - Order saved',
      { classname: 'bg-success text-light', delay: 3000 });
      this.basketService.deleteLocalBasket(basket.id);
      const navigationsExtras: NavigationExtras = {
        state: order
      }
      this.router.navigate(['checkout/success'], navigationsExtras)

    }, error => {
      this.toastService.show(`ERROR - ${error.message}`,
      { classname: 'bg-error text-light', delay: 3000 });
      console.log(error);
    });
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    }
  }
}
