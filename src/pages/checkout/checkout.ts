import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Customer, MenuItem} from "../../models";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage implements OnInit {

  items: MenuItem[] = []
  ordertotal: number;
  customer: Customer;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartServiceProvider: CartServiceProvider,
              public userServiceProvider: UserServiceProvider) {
  }

  ngOnInit(): void {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  sumTotal() {
    return Promise.resolve(this.items.reduce((total: number, item: MenuItem) => total + item.price, 0))
  }

}
