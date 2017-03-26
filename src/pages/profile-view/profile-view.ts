import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile';
import { AccountProvider } from '../../providers/account';
import { LotPage } from '../../pages/lot/lot';

/*
  Generated class for the ProfileView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
 	selector: 'page-profile-view',
 	templateUrl: 'profile-view.html'
})

export class ProfileViewPage {
	
	lotPage;

	constructor(public navCtrl: NavController, public navParams: NavParams, public profileProvider: ProfileProvider, public accountProvider: AccountProvider) {
		this.lotPage = LotPage;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfileViewPage');
	}

}
