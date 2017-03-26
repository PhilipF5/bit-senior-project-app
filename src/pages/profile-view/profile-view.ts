import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile';
import { AccountProvider } from '../../providers/account';
import { AuctionProvider } from '../../providers/auction';
import { LotProvider } from '../../providers/lot';
import { LotPage } from '../../pages/lot/lot';
import * as moment from 'moment';
import 'moment-timezone';

/*
  Generated class for the ProfileView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
 	selector: 'page-profile-view',
 	templateUrl: 'profile-view.html'
})

export class ProfileViewPage {
	
	lotPage;

	constructor(public navCtrl: NavController, public navParams: NavParams, public profileProvider: ProfileProvider, public accountProvider: AccountProvider, public loadCtrl: LoadingController, public auctionProvider: AuctionProvider, public lotProvider: LotProvider) {
		this.lotPage = LotPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfileViewPage');
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
	
	formatBidTimestamp(input) {
		return moment(input)
		.tz("America/New_York")
		.format("M/DD/YY [at] h:mm:ss A (z)");
	}

}
