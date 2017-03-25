import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuctionViewPage } from '../../pages/auction-view/auction-view';

/*
  Generated class for the AuctionList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
 	selector: 'page-auction-list',
 	templateUrl: 'auction-list.html'
})

export class AuctionListPage {
	
	auctionViewPage;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.auctionViewPage = AuctionViewPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AuctionListPage');
	}

}
