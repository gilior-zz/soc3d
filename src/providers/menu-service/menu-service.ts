import {Injectable} from '@angular/core';
import {MenuItem} from "../../models";

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuServiceProvider {
  items: MenuItem[] = [
    {id: 'item1-id', description: 'item1-description', img: "assets/imgs/item1.png", name: 'item1-name',price3:3,price1:1,price2:2},
    {id: 'item2-id', description: 'item2-description', img: "assets/imgs/item2.png", name: 'item2-name',price3:3,price1:1,price2:2},
    {id: 'item3-id', description: 'item3-description', img: "assets/imgs/item3.png", name: 'item3-name',price3:3,price1:1,price2:2},
    {id: 'item4-id', description: 'item4-description', img: "assets/imgs/item4.png", name: 'item4-name',price3:3,price1:1,price2:2},
    {id: 'item5-id', description: 'item5-description', img: "assets/imgs/item5.png", name: 'item5-name',price3:3,price1:1,price2:2},
    {id: 'item6-id', description: 'item6-description', img: "assets/imgs/item6.png", name: 'item6-name',price3:3,price1:1,price2:2},

  ];

  constructor() {
    console.log('Hello MenuServiceProvider Provider');
  }

  getItemsDB(): Promise<MenuItem[]> {
    const promise = new Promise<MenuItem[]>((resolve, reject) => {
      resolve(this.items)
    });
    return promise;
  }

  getOne(id: string): Promise<MenuItem> {
    const promise = new Promise<MenuItem>((resolve, reject) => {
      const item = this.items.find(i => i.id === id);
      resolve(item)
    });
    return promise;
  }

}
