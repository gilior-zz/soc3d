import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Customer, MenuItem, Reward} from "../../models";
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
              public userServiceProvider: UserServiceProvider) {
  }

  ngOnInit(): void {
    this.userServiceProvider.user = this.customer;
    this.cartServiceProvider.getCart()
      .then(cart => this.items = cart)
      .then(cart => this.sumTotal())
      .then(sum => this.ordertotal = sum);
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
    this.rewardsDisplay != this.rewardsDisplay;
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

}
