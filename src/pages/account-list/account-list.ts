import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account';
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { CreateProfilePage } from '../../pages/create-profile/create-profile';

/*
  Generated class for the AccountList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-account-list',
	templateUrl: 'account-list.html'
})

export class AccountListPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public acctProvider: AccountProvider, public modalCtrl: ModalController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountListPage');
	}
	
	setAccount(i) {
		this.acctProvider.selectedAcct = i;
		this.acctProvider.selectedAcctID = this.acctProvider.accounts[i].id;
	}
	
	createAccount() {
		let modal = this.modalCtrl.create(CreateAccountPage, {}, {enableBackdropDismiss: false});
		modal.present();
	}
	
	createBuyer() {
		let modal = this.modalCtrl.create(CreateProfilePage, {}, {enableBackdropDismiss: false});
		modal.present();
	}

}
