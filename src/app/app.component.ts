/*
	Root Component Script
	=====================
	The root component contains the slideout navigation menu
	and a container for whichever page is being displayed.
*/

// Standard root component stuff
import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, ModalController, MenuController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// Import main data service
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

	// Set the HomePage as our navigation root
	rootPage = HomePage;
	
	// Navigation pages
	accountViewPage;
	auctionListPage;
	profileViewPage;
	accountListPage;
	reportsPage;
	
	// Grab the nav controller from the HTML
	@ViewChild('content') nav: NavController;
	
	// Unique constructor because we don't inherit BaseView
	constructor(platform: Platform, public dataSrv: DataProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public menuCtrl: MenuController) {
    	platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
    	});
		// Navigation pages
		this.accountViewPage = AccountViewPage;
		this.auctionListPage = AuctionListPage;
		this.profileViewPage = ProfileViewPage;
		this.accountListPage = AccountListPage;
		this.reportsPage = ReportsPage;
  	}
	
}
