/*
	Create Account Page Script
	==========================
	Form to create a new dealer account.
	Should be displayed as a modal.
*/

// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import needed libraries
import * as models from '../../app/classes';

@Component({
	selector: 'page-create-account',
	templateUrl: 'create-account.html'
})
export class CreateAccountPage extends BaseView {

	// Special object for new account
	public account: any = {
		dealerName: null,
		contactPhone: null,
		contactEmail: null,
		creditAmount: null,
		streetAddress: null,
		city: null,
		state: null,
		postalCode: null
	};

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}
	
	// Return to AccountListPage
	cancel() {
		this.viewCtrl.dismiss();
	}
	
	// Submit the new dealer to API
	submit() {
		this.createLoader("Loading...");
		this.dataSrv.createAccount(this.account)
		.then(
			(newAccount: models.Account) => {
				this.dismissLoader();
				this.viewCtrl.dismiss();
				let alert = this.alertCtrl.create({
					title: 'Dealer created',
					subTitle: newAccount.owner,
					buttons: ['OK'],
					enableBackdropDismiss: false
				});
				alert.present();
			}
		);
	}

}
