import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LotProvider } from '../../providers/lot';
import { AuctionProvider } from '../../providers/auction';
import { AccountProvider } from '../../providers/account';
import { LoginProvider } from '../../providers/login';
import * as moment from 'moment';
import 'moment-timezone';


/*
  Generated class for the Lot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
	selector: 'page-lot',
	templateUrl: 'lot.html'
})
export class LotPage {

	public bidAmount;

	constructor(public navCtrl: NavController, public navParams: NavParams, public lotProvider: LotProvider, public auctionProvider: AuctionProvider, public alertCtrl: AlertController, public acctProvider: AccountProvider, public loginProvider: LoginProvider) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LotPage');
	}
	
	formatBidTime(input) {
		return moment(input)
		.tz('America/New_York')
		.format("h:mm:ss A");
	}
	
	isOpen() {
		if (this.lotProvider.activeLot.status == 'Unsold' && this.auctionProvider.isCurrent(this.auctionProvider.auction)) {
			return true;
		}
		else return false;
	}
	
	isSold() {
		if (this.lotProvider.activeLot.status == 'Sold') {
			return true;
		}
		else return false;
	}
	
	isUpcoming() {
		if (this.auctionProvider.isUpcoming(this.auctionProvider.auction)) {
			return true;
		}
		else return false;
	}
	
	quickBid() {
		this.bidAmount = this.lotProvider.activeLot.currentPrice + 1000;
		this.confirmBid();
	}
	
	confirmBid() {
		let confirm = this.alertCtrl.create({
			title: 'Confirm Bid',
			message: 'Do you want to bid $' + this.bidAmount + ' on this lot?',
			buttons: [
				{
					text: 'No',
					handler: () => {

					}
				},
				{
					text: 'Yes',
					handler: () => {
						this.lotProvider.bidOnLot(this.bidAmount);
					}
				}
			]
		});
		confirm.present();
	}
	
	isWinning() {
		if (this.lotProvider.activeLot.bidsCount > 0 && this.lotProvider.activeLot.status == "Unsold") {
			if (this.lotProvider.activeLot.bidsMax.accountID == this.acctProvider.myAccount.id) {
				return true;
			}
		}
		return false;
	}
	
	hasWon() {
		if (this.lotProvider.activeLot.bidsCount > 0 && this.lotProvider.activeLot.status == "Sold") {
			if (this.lotProvider.activeLot.bidsMax.accountID == this.acctProvider.myAccount.id) {
				return true;
			}
		}
		return false;
	}

}
