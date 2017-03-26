import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuctionViewPage } from '../../pages/auction-view/auction-view';
import { AuctionProvider } from '../../providers/auction';
import { LoginProvider } from '../../providers/login';
import { ProfileProvider } from '../../providers/profile';
import * as moment from 'moment';
import 'moment-timezone';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public auctionProvider: AuctionProvider, public loadCtrl: LoadingController, public loginProvider: LoginProvider, public profileProvider: ProfileProvider) {
		this.auctionViewPage = AuctionViewPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AuctionListPage');
	}
	
	navToAuction(id)
	{
		let loader = this.loadCtrl.create({
      		content: "Loading..."
    	});
    	loader.present();
		this.auctionProvider.loadAuction(id)
		.then(() => {
			loader.dismiss();
			this.navCtrl.push(this.auctionViewPage);
		});
	}
	
	formatDate(input) {
		return moment(input)
		.tz('America/New_York')
		.format("MMMM D, YYYY");
	}
	
	formatTime(input) {
		return moment(input)
		.tz('America/New_York')
		.format("h:mm A");
	}
	
	isUpcoming(auct) {
		return !(moment().isAfter(auct.startTime));
	}
	
	isPast(auct) {
		if (this.loginProvider.creds.role == "user") {
			return (this.profileProvider.profile.auctions.indexOf(auct.id) != -1 && moment().isAfter(auct.endTime));
		}
		return moment().isAfter(auct.endTime);
	}
	
	isCurrent(auct) {
		if (this.loginProvider.creds.role == "user") {
			return (this.profileProvider.profile.auctions.indexOf(auct.id) != -1 && !this.isUpcoming(auct) && !this.isPast(auct));
		}
	}
	
	isRegistered(auct) {
		if (this.loginProvider.creds.role == "user") {
			return (this.profileProvider.profile.auctions.indexOf(auct.id) != -1 && this.isUpcoming(auct));
		}
	}

}
