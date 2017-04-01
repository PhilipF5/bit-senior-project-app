import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuctionProvider } from '../../providers/auction';
import { LotProvider } from '../../providers/lot';
import { LotPage } from '../../pages/lot/lot';
import { LoginProvider } from '../../providers/login';
import * as moment from 'moment';
import 'moment-timezone';

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

	constructor(public navCtrl: NavController, public loadCtrl: LoadingController, public navParams: NavParams, public auctionProvider: AuctionProvider, public lotProvider: LotProvider, public loginProvider: LoginProvider) {
		this.lotPage = LotPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AuctionViewPage');
	}
	
	formatDate() {
		return moment(this.auctionProvider.auction.startTime)
		.tz('America/New_York')
		.format("MMMM D, YYYY");
	}
	
	formatTime() {
		return moment(this.auctionProvider.auction.startTime)
		.tz('America/New_York')
		.format("h:mm A") + " to " + moment(this.auctionProvider.auction.endTime)
		.tz('America/New_York')
		.format("h:mm A (z)");
	}
	
	navToLot(id) {
		let loader = this.loadCtrl.create({
      		content: "Loading..."
    	});
    	loader.present();
		this.auctionProvider.loadAuction(this.auctionProvider.auction.id)
		.then(() => {
			for (let lot of this.auctionProvider.auction.lots) {
				if (lot.id == id) {
					this.lotProvider.activeLot = lot;
					loader.dismiss();
					this.navCtrl.push(this.lotPage);
				}
			}
		});
	}

}
