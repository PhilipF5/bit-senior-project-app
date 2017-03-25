import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { AccountProvider } from '../../providers/account';
import { LoginPage } from '../../pages/login/login';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { AuctionViewPage } from '../../pages/auction-view/auction-view';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {
	
	profileViewPage;
	auctionViewPage;

	constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public modalCtrl: ModalController) {
		this.profileViewPage = ProfileViewPage;
		this.auctionViewPage = AuctionViewPage;
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.present();
 	}

}
