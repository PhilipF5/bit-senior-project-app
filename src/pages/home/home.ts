import { Component, ViewChild } from '@angular/core';

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

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {
	
	profileViewPage;
	auctionViewPage;
	@ViewChild('donutCanvas') donutCanvas;
    donutChart: any;

	constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public modalCtrl: ModalController, public profileProvider: ProfileProvider, public auctionProvider: AuctionProvider, public loadCtrl: LoadingController) {
		this.profileViewPage = ProfileViewPage;
		this.auctionViewPage = AuctionViewPage;
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.onDidDismiss(() => {
			this.loadChart();
		});
		modal.present();
 	}
	
	loadChart() {
		this.donutChart = new Chart(this.donutCanvas.nativeElement, {
        	type: 'doughnut',
        	options: {
				legend: {
					position: 'bottom'
				},
				layout: { padding: 10 }
			},
			data: {
				labels: [
					"Virginia",
					"New York",
					"Illinois",
					"South Carolina",
					"Ohio",
					"New Jersey"
				],
				datasets: [{
    				label: "Test",
					data: [750, 1147, 675, 432, 703, 450],
					backgroundColor: [
    					'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
					],
					hoverBackgroundColor: [
    					'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
					]
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
