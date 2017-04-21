/*
	Account View Page Script
	========================
	Page for users to view their dealer account.
*/

// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import pages for navigation
import { LotPage } from '../../pages/lot/lot';

// Import needed libraries
import * as models from '../app/classes';

@Component({
 	selector: 'page-account-view',
 	templateUrl: 'account-view.html'
})
export class AccountViewPage extends BaseView {
	
	// Navigation pages
	private lotPage: any;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
		// Navigation pages
		this.lotPage = LotPage;
	}

}
