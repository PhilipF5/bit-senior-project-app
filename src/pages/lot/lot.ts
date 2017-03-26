import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LotProvider } from '../../providers/lot';
import { AuctionProvider } from '../../providers/auction';
import * as moment from 'moment';
import 'moment-timezone';


/*
  Generated class for the Lot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
	selector: 'page-lot',
	templateUrl: 'lot.html'
})
export class LotPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public lotProvider: LotProvider, public auctionProvider: AuctionProvider) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LotPage');
	}
	
	formatBidTime(input) {
		return moment(input)
		.tz('America/New_York')
		.format("h:mm:ss A");
	}
	
	isOpen() {
		if (this.lotProvider.activeLot.status == 'Unsold' && this.auctionProvider.isCurrent(this.auctionProvider.auction)) {
			return true;
		}
		else return false;
	}
	
	isSold() {
		if (this.lotProvider.activeLot.status == 'Sold') {
			return true;
		}
		else return false;
	}
	
	isUpcoming() {
		if (this.auctionProvider.isUpcoming(this.auctionProvider.auction)) {
			return true;
		}
		else return false;
	}

}
