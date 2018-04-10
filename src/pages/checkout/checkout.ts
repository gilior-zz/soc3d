import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Customer, MenuItem, Reward} from "../../models";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PayPal, PayPalConfiguration, PayPalEnvironment, PayPalPayment} from "@ionic-native/paypal";
import {HomePage} from "../home/home";
import {Observable} from "rxjs/Observable";
import {fromPromise} from "rxjs/observable/fromPromise";

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
  customer: string;

  rewardsDisplay: boolean;
  discountUsed: boolean;
  rewardList: Reward[] = [];
  discount: Reward;
  discountAmount: number = 0;
  discountTotoal: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartServiceProvider: CartServiceProvider,
              public userServiceProvider: UserServiceProvider,
              private payPal: PayPal) {
  }

  ngOnInit(): void {
    this.userServiceProvider.user = this.customer;

    this.cartServiceProvider.getCart()
      .then(cart => this.items = cart)
      .then(cart => this.sumTotal())
      .then(sum => this.ordertotal = sum)
      .then(cash => this.userServiceProvider.returnUser())
      .then(cust => this.loadRewards(cust));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  sumTotal(): Promise<number> {
    return Promise.resolve<number>(this.items.reduce((total: number, item: MenuItem) => total + item.price, 0))
  }

  removeOne(itemId, itemPrice) {
    this.cartServiceProvider.removeItem(itemId, itemPrice);
    this.sumTotal()
      .then(sum => this.ordertotal = sum);
  }

  addRewsrds() {
    this.rewardsDisplay = !this.rewardsDisplay;
  }

  loadRewards(user: string) {
    this.userServiceProvider.storageControl('get', `${user}-rewards`)
      .then(res => {
        this.customer = user;
        if (!res) {
          let tmpObj: Reward = {rewardId: 'No rwrds', amount: 0};
          this.rewardList.push(tmpObj)
        }
        else {
          this.rewardList = res;
        }
      })
  }

  applyReward(reward: Reward) {
    let tmpAmount = this.ordertotal - reward.amount;
    if (tmpAmount <= 0)
      this.userServiceProvider.displayAlerts('cannot use reward', 'reward amount is greater then item price')
    else {
      this.discount = reward;
      this.discountAmount = reward.amount;
      this.discountTotoal = this.ordertotal - reward.amount;
      this.discountUsed = true;
    }
  }

  removeReward() {
    this.discountUsed = false;
    this.discount = null;
  }

  puchase() {
    if (this.discountUsed) {
      let tmpId = this.discount.rewardId;
      let tmp = this.rewardList.map(i => i.rewardId).indexOf(tmpId);
      if (tmp > -1)
        this.rewardList.splice(tmp, 1);
      this.userServiceProvider.storageControl('set', `${this.customer}-rewards`)
        .then(res => console.log('saved ', res));
      this.payCart();
      this.cartServiceProvider.emptyCart();
      this.userServiceProvider.displayAlerts('tnx', `u paid us ${this.ordertotal}`)
      this.navCtrl.push(HomePage);
    }
    else {
      this.payCart();
      this.cartServiceProvider.emptyCart();
      this.userServiceProvider.displayAlerts('tnx', `u paid us ${this.ordertotal}`)
      this.navCtrl.push(HomePage);
    }
  }


  private payCart() {
    let obj: PayPalEnvironment = {
      PayPalEnvironmentProduction: 'foo',
      PayPalEnvironmentSandbox: 'AbuWU_rZ-nklShzECWO8yhJBco0XZjibwLg7vPV5TqXPiKTlTWb77OwOpEOyd9dzGTIAmn-bgMkZ2cHh'
    }
    let obs = fromPromise(this.payPal.init(obj));
    obs.subscribe(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandBox', new PayPalConfiguration({}))
        .then(() => {
          let payment = new PayPalPayment(String(this.ordertotal), 'USD', 'desc', 'sale');
          this.payPal.renderSinglePaymentUI(payment)
            .then((res => {
              console.log('res from pay pal ', res);
            }), (err) => {
              console.log('payment err ', err)
            })
        }, (err) => {
          console.log('conf err', err)
        })
    }, (err) => {
      console.log('init err ', err);
    })
  }
}
