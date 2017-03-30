import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the CreateAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-create-account',
	templateUrl: 'create-account.html'
})

export class CreateAccountPage {

	account = {
		dealerName: null,
		contactPhone: null,
		contactEmail: null,
		creditAmount: null,
		streetAddress: null,
		city: null,
		state: null,
		postalCode: null
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateAccountPage');
	}
	
	cancel() {
		this.viewCtrl.dismiss();
	}

}
