/*
	Profile View Page
	=================
	Shows a buyer's profile history.
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
import * as moment from 'moment';
import 'moment-timezone';
import * as models from '../app/classes';

@Component({
 	selector: 'page-profile-view',
 	templateUrl: 'profile-view.html'
})
export class ProfileViewPage extends BaseView {
	
	// Navigation pages
	public lotPage: any;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
		// Navigation pages
		this.lotPage = LotPage;
	}
	
	// Format timestamps with Moment Timezone
	formatBidTimestamp(input) {
		return moment(input)
		.tz("America/New_York")
		.format("M/DD/YY [at] h:mm:ss A (z)");
	}
	
	// Load page for lot
	navToLot(id) {
		this.createLoader("Loading...");
		this.dataSrv.refreshAuction()
		.then(() => {
			this.dataSrv.activeLot = id;
			this.dismissLoader();
			this.navCtrl.push(this.lotPage);
		});
	}

}
