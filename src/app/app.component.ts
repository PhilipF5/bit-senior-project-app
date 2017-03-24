import { Component } from '@angular/core';
import { Platform, AlertController, ModalController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login';
import { AccountProvider } from '../providers/account';
import { LoginPage } from '../pages/login/login';


@Component({
  	templateUrl: 'app.html'
})

export class MyApp {
  	rootPage = HomePage;

constructor(platform: Platform, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public menuCtrl: MenuController) {
    	platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
    	});
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
						this.loginProvider.creds = {
							apiKey: null,
							error: null,
							firstName: null,
							lastName: null,
							role: null,
							username: null
						};
						let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
						modal.present();
					}
				}
			]
		});
		confirm.present();
	}
}
