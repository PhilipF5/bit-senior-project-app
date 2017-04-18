/* Lot Page
Details for a particular lot. Allows bidding and
accepting of bids.
*/

// Standard page stuff
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import needed libraries
import * as moment from 'moment';
import 'moment-timezone';
import * as models from '../app/classes';

@Component({
	selector: 'page-lot',
	templateUrl: 'lot.html'
})
export class LotPage extends BaseView {

	// Data-bound to the corresponding fields on the form
	public bidAmount: number;
	
	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}
	
	// Accept the highest bid as the winner
	public acceptBid() {
		this.createLoader("Accepting bid...");
		this.dataSrv.acceptBid()
		.then(
			() => {
				this.dismissLoader();
				let alert = this.alertCtrl.create({
					title: "Bid accepted",
					subTitle: "This lot is now closed.",
					buttons: [
						{
							text: 'OK',
							handler: () => {
								this.createLoader("Refreshing...");
								this.dataSrv.loadData()
								.then(() => {
									this.dataSrv.refreshAuction();
									this.dataSrv.refreshActiveLot();
									this.dismissLoader();
								});
							}
						}
					]
				});
				alert.present();
			}
		);
	}
	
	// Confirm bid amount, and then place bid
	public confirmBid() {
		let confirm = this.alertCtrl.create({
			title: 'Confirm Bid',
			message: 'Do you want to bid $' + this.bidAmount + ' on this lot?',
			buttons: [
				{
					text: 'No',
					handler: () => {}
				},
				{
					text: 'Yes',
					handler: () => {
						this.createLoader("Sending bid...");
						this.dataSrv.placeBid(this.bidAmount)
						.then(
							(result) => {
								this.dismissLoader();
								let alert = this.alertCtrl.create({
									title: result.title,
									subTitle: result.subtitle,
									buttons: [
										{
											text: 'OK',
											handler: () => {
												this.createLoader("Refreshing...");
												this.dataSrv.loadData()
												.then(() => {
													this.dataSrv.refreshAuction();
													this.dataSrv.refreshActiveLot();
													this.dismissLoader();
												});
											}
										}
									]
								});
								alert.present();
							},
							(err) => {
								this.showAlert("An unknown error occurred.");
							}
						)
					}
				}
			]
		});
		confirm.present();
	}
	
	// Format bid time into human-readable Eastern time
	public formatBidTime(input): string {
		return moment(input)
		.tz('America/New_York')
		.format("h:mm:ss A");
	}
	
	// Automatically bid $1000 above current price
	public quickBid() {
		this.bidAmount = this.dataSrv.getActiveLot().currentPrice + 1000;
		this.confirmBid();
	}

}
