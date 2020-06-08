import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDeliveryMethod } from '../shared/models/IDeliveryMethod';
import { map } from 'rxjs/operators';
import { IOrderToCreate, IOrder } from '../shared/models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(order: IOrderToCreate) {
    return this.http.post<IOrder>(this.baseUrl + 'orders', order);
  }


  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'Orders/deliveryMethod').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
