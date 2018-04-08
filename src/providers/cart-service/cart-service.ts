import {Injectable} from '@angular/core';
import {MenuItem} from "../../models";

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartServiceProvider {
  cart: MenuItem[] = [];

  constructor() {

  }

  getCart() {
    return Promise.resolve(this.cart);
  }

  addItem(item: MenuItem) {
    this.cart.push(item);
  }

  removeItem(id: string, price: number) {
    let orderId = id + '-' + price;
    let tmp = this.cart.map(i => i.orderId).indexOf(orderId);
    if (tmp > -1) this.cart.splice(tmp, 1);

  }

}
