import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MenuServiceProvider} from "../../providers/menu-service/menu-service";
import {BonusFeature, MenuItem} from "../../models";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";

/**
 * Generated class for the MenuDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage implements OnInit {
  price: number;
  bonusFeature: string = 'no';
  private item: MenuItem;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private  menuServiceProvider: MenuServiceProvider,
              private userServiceProvider: UserServiceProvider,
              private cartServiceProvider: CartServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuDetailPage');
  }

  ngOnInit(): void {
    let id = this.navParams.get('id');
    this.menuServiceProvider.getOne(id)
      .then(item => this.item = {...item})
      .then(() => {
        this.price = this.item.price1
      })
  }

  addToCart() {
    if (!this.userServiceProvider.success) {
      this.userServiceProvider.displayAlerts('acnnot purchase', 'sign in 1st')
      return;
    }
    this.item = {
      ...this.item,
      price: +this.price,
      bonusFeature:BonusFeature[this.bonusFeature] ,
      orderId: this.item.id + '-' + this.price
    }
    this.cartServiceProvider.addItem(this.item);

    this.userServiceProvider.displayAlerts(`${this.item.name} ${this.item.price}`, 'added to cart')

  }


}
