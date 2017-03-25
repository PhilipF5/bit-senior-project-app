import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LotPage } from '../../pages/lot/lot';

/*
  Generated class for the AuctionView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
 	selector: 'page-auction-view',
 	templateUrl: 'auction-view.html'
})

export class AuctionViewPage {

	lotPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.lotPage = LotPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AuctionViewPage');
	}

}
