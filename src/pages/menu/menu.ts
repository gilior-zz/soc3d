import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MenuServiceProvider} from "../../providers/menu-service/menu-service";
import {MenuItem} from "../../models";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  private items: MenuItem[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private  menuServiceProvider: MenuServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit(): void {
    this.grabMenu();
  }

  grabMenu() {
    this.menuServiceProvider.getItemsDB()
      .then(items => this.items = items);
  }

  chhoseItems(id) {
    this.navCtrl.push("MenuDetailPage", {
      id: id
    })
  }


}
