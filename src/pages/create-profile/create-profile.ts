/*
	Create Profile Page Script
	==========================
	Form to create a new buyer profile.
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
	selector: 'page-create-profile',
	templateUrl: 'create-profile.html'
})
export class CreateProfilePage extends BaseView {

	// Special object for new profile
	public user: any = {
		firstName: null,
		lastName: null,
		username: null,
		accountID: null
	}
	
	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
		// Get selected account ID
		this.user.accountID = this.dataSrv.selectedAcctID;
	}
	
	// Return to AccountListPage
	cancel() {
		this.viewCtrl.dismiss();
	}
	
	// Submit the new buyer to API
	submit() {
		this.createLoader("Loading...");
		this.dataSrv.createProfile(this.user)
		.then(
			(newUser: models.Profile) => {
				this.dismissLoader();
				this.viewCtrl.dismiss();
				let alert = this.alertCtrl.create({
					title: 'User ' + newUser["item1"] + ' created',
					subTitle: 'Provide them this auth key to log in:  ' + newUser["item2"],
					buttons: ['OK'],
					enableBackdropDismiss: false
				});
				alert.present();
			}
		);
	}

}
