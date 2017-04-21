/*
	Auction View Page Script
	========================
	Displays a single auction with list of lots.
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
 	selector: 'page-auction-view',
 	templateUrl: 'auction-view.html'
})
export class AuctionViewPage extends BaseView {

	// Navigation pages
	private lotPage: any;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
		// Navigation pages
		this.lotPage = LotPage;
	}
	
	// Format dates and times with Moment Timezone
	formatDate() {
		return moment(this.dataSrv.activeAuction.startTime)
		.tz('America/New_York')
		.format("MMMM D, YYYY");
	}
	
	formatTime() {
		return moment(this.dataSrv.activeAuction.startTime)
		.tz('America/New_York')
		.format("h:mm A") + " to " + moment(this.dataSrv.activeAuction.endTime)
		.tz('America/New_York')
		.format("h:mm A (z)");
	}
	
	// Load LotPage
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
