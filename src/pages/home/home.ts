/*
	Home Page Script
	================
	Dashboard for both users and admins.
*/

// Standard page stuff plus ViewChild
import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import pages for navigation
import { LoginPage } from '../../pages/login/login';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { AuctionViewPage } from '../../pages/auction-view/auction-view';

// Import needed libraries
import { Chart } from 'chart.js';
import * as moment from 'moment';
import 'moment-timezone';
import * as randomColor from 'randomcolor';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})
export class HomePage extends BaseView {

	// Grab canvas element from HTML
	@ViewChild('chartCanvas') chartCanvas;
	
	// Navigation pages
	public auctionViewPage: any;
	public profileViewPage: any;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
		// Navigation pages
		this.profileViewPage = ProfileViewPage;
		this.auctionViewPage = AuctionViewPage;
		// Lock user into login modal
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.onDidDismiss(() => {
			if (this.dataSrv.role == "admin") {
				// Load the "Sales by Type" chart
				this.loadTypesChart(this.chartCanvas, this.dataSrv.chartData.types);
			}
		});
		modal.present();
 	}
	
	// Format dates and times with Moment Timezone
	formatDate(input) {
		return moment(input)
		.tz('America/New_York')
		.format("MMMM D, YYYY");
	}
	
	formatTime(input) {
		return moment(input)
		.tz('America/New_York')
		.format("h:mm A");
	}
	
	// Load AuctionViewPage
	navToAuction(id)
	{
		this.createLoader("Loading...")
		this.dataSrv.loadAuction(id)
		.then(() => {
			this.dismissLoader();
			this.navCtrl.push(this.auctionViewPage);
		});
	}

}
