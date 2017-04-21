import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, ModalController, MenuController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { DataProvider } from '../providers/data';

// Import pages for navigation
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AccountViewPage } from '../pages/account-view/account-view';
import { AuctionListPage } from '../pages/auction-list/auction-list';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { AccountListPage } from '../pages/account-list/account-list';
import { ReportsPage } from '../pages/reports/reports';

@Component({
  	templateUrl: 'app.html'
})
export class MyApp {
  	rootPage = HomePage;
	accountViewPage;
	auctionListPage;
	profileViewPage;
	accountListPage;
	reportsPage;
	
	@ViewChild('content') nav: NavController;

	constructor(platform: Platform, public dataSrv: DataProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public menuCtrl: MenuController) {
    	platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
    	});
		
		this.accountViewPage = AccountViewPage;
		this.auctionListPage = AuctionListPage;
		this.profileViewPage = ProfileViewPage;
		this.accountListPage = AccountListPage;
		this.reportsPage = ReportsPage;
  	}
	
	showLogoutConfirm() {
		let confirm = this.alertCtrl.create({
			title: 'Log out?',
			message: 'Are you sure you want to log out?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						
					}
				},
				{
					text: 'Log Out',
					handler: () => {
						this.menuCtrl.close();
						this.dataSrv.logout();
						let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
						modal.present();
					}
				}
			]
		});
		confirm.present();
	}
}
