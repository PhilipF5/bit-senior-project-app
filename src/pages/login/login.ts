/*
	Login Page Script
	=================
	Form to enter username and password.
	Should be displayed as a Modal.
*/

// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage extends BaseView {

	// Data-bound to the corresponding fields on the form
	public username: string;
	public password: string;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}

	// Tell the DataProvider to log the user in
	public login() {
		this.createLoader("Logging in...");
		this.dataSrv.login(this.username, this.password)
		.then(
			// Handle the result
			() => {
				this.dismissLoader();
				this.dismissView();
			},
			(err) => {
				this.dismissLoader();
				this.showAlert("Login failed", err);
			}
		);
	}

}
