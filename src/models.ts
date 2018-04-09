export interface UserData {
  username: string,
  creation: Date,
  logins: number,
  rewardsCount: number,
  lastLogin: Date,
  id: string
}

export interface Reward {
  rewardId: string;
  amount: number
}

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  img: string;
  price1: 1
  price2: 2;
  price3: 3;
  price?: number;
  bonusFeature?: BonusFeature;
  orderId?: string
}

export enum BonusFeature {
  no, shield, support, trainer
}

export  type Customer = {

}
