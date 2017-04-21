/*
	Auction List Page Script
	========================
	Page that shows all auctions in categories
	based on time or registration status.
*/

// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import pages for navigation
import { AuctionViewPage } from '../../pages/auction-view/auction-view';

// Import needed libraries
import * as moment from 'moment';
import 'moment-timezone';
import * as models from '../app/classes';

@Component({
 	selector: 'page-auction-list',
 	templateUrl: 'auction-list.html'
})
export class AuctionListPage extends BaseView {
	
	// Navigation pages
	private auctionViewPage: any;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
		// Navigation pages
		this.auctionViewPage = AuctionViewPage;
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
	
	// Check times and registrations for auctions
	// Basically a page-specific wrapper
	isCurrent(auct) {
		if (this.dataSrv.role == "user") {
			return (this.dataSrv.auctionTiming(auct) == "current" && this.dataSrv.isRegForAuction(auct));
		}
		return this.dataSrv.auctionTiming(auct) == "current";
	}
	
	isPast(auct) {
		if (this.dataSrv.role == "user") {
			return (this.dataSrv.auctionTiming(auct) == "past" && this.dataSrv.isRegForAuction(auct));
		}
		return this.dataSrv.auctionTiming(auct) == "past";
	}
	
	isRegistered(auct) {
		if (this.dataSrv.role == "user") {
			return (this.dataSrv.auctionTiming(auct) == "upcoming" && this.dataSrv.isRegForAuction(auct));
		}
	}
	
	isUpcoming(auct) {
		return this.dataSrv.auctionTiming(auct) == "upcoming";
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
