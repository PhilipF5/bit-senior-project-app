import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account';

/*
  Generated class for the AccountList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-account-list',
	templateUrl: 'account-list.html'
})

export class AccountListPage {

	selectedAcct = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, public acctProvider: AccountProvider) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountListPage');
	}
	
	setAccount(i) {
		this.selectedAcct = i;
	}

}
