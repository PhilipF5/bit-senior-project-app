import { Component } from '@angular/core';

import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { AccountProvider } from '../../providers/account';
import { ProfileProvider } from '../../providers/profile';
import { AuctionProvider } from '../../providers/auction';
import { LoginPage } from '../../pages/login/login';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { AuctionViewPage } from '../../pages/auction-view/auction-view';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {
	
	profileViewPage;
	auctionViewPage;

	constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public modalCtrl: ModalController, public profileProvider: ProfileProvider, public auctionProvider: AuctionProvider, public loadCtrl: LoadingController) {
		this.profileViewPage = ProfileViewPage;
		this.auctionViewPage = AuctionViewPage;
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.present();
 	}
	
	isUpcoming(auct) {
		return !(moment().isAfter(auct.startTime));
	}
	
	formatDate(input) {
		return moment(input)
		.tz('America/New_York')
		.format("MMMM D, YYYY");
	}
	
	isRegistered(auct) {
		if (this.loginProvider.creds.role == "user") {
			return (this.profileProvider.profile.auctions.indexOf(auct.id) != -1 && this.isUpcoming(auct));
		}
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

}
