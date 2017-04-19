// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import needed libraries
import * as models from '../app/classes';

@Component({
	selector: 'page-create-account',
	templateUrl: 'create-account.html'
})
export class CreateAccountPage extends BaseView {

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
	
	cancel() {
		this.viewCtrl.dismiss();
	}
	
	submit() {
		this.createLoader("Loading...");
		this.dataSrv.createAccount(account)
		.then(
			(newAccount) => {
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
