/*
	Account List Page Script
	========================
	Displays all accounts and their buyers
	for administrative purposes.
*/

// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import pages for navigation
import { CreateAccountPage } from '../../pages/create-account/create-account';
import { CreateProfilePage } from '../../pages/create-profile/create-profile';

// Import needed libraries
import * as models from '../app/classes';

@Component({
	selector: 'page-account-list',
	templateUrl: 'account-list.html'
})
export class AccountListPage extends BaseView {

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}
	
	// Present modals for creating new accounts and buyers
	createAccount() {
		let modal = this.modalCtrl.create(CreateAccountPage, {}, {enableBackdropDismiss: false});
		modal.present();
	}
	
	createBuyer() {
		let modal = this.modalCtrl.create(CreateProfilePage, {}, {enableBackdropDismiss: false});
		modal.present();
	}

}
