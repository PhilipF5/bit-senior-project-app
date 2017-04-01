import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { AccountProvider } from '../../providers/account';
import { ProfileProvider } from '../../providers/profile';
import { AuctionProvider } from '../../providers/auction';
import { LoginPage } from '../../pages/login/login';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { AuctionViewPage } from '../../pages/auction-view/auction-view';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import 'moment-timezone';
import * as randomColor from 'randomcolor';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {
	
	profileViewPage;
	auctionViewPage;
	@ViewChild('chartCanvas') chartCanvas;
    chart: any;
	typesData: any;

	constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public modalCtrl: ModalController, public profileProvider: ProfileProvider, public auctionProvider: AuctionProvider, public loadCtrl: LoadingController, public http: Http) {
		this.profileViewPage = ProfileViewPage;
		this.auctionViewPage = AuctionViewPage;
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.onDidDismiss(() => {
			this.loadTypesData();
		});
		modal.present();
 	}
	
	loadTypesData() {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/types")
			.subscribe(
				res => this.typesData = res.json(),
				(err) => {},
				() => {
					this.loadTypesChart();
					resolve();
				}
			);
		});
	}
	
	loadTypesChart() {
		this.chart = new Chart(this.chartCanvas.nativeElement, {
        	type: 'polarArea',
        	options: {
				legend: {
					position: "bottom"
				},
				layout: { padding: 10 }
			},
			data: {
				labels: this.typesData.typeNames,
				datasets: [{
    				label: "Test",
					data: this.typesData.salesByVolume,
					backgroundColor: randomColor({
						count: this.typesData.typeNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: this.typesData.typeNames.length,
						luminosity: "light"
					}),
				}]
			}
        });
	}
	
	isUpcoming(auct) {
		return !(moment().isAfter(auct.startTime));
	}
	
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
	
	isRegistered(auct) {
		if (this.loginProvider.creds.role == "user") {
			return (this.profileProvider.profile.auctions.indexOf(auct.id) != -1 && this.isUpcoming(auct));
		}
	}
	
	navToAuction(id)
	{
		let loader = this.loadCtrl.create({
      		content: "Loading..."
    	});
    	loader.present();
		this.auctionProvider.loadAuction(id)
		.then(() => {
			loader.dismiss();
			this.navCtrl.push(this.auctionViewPage);
		});
	}

}
