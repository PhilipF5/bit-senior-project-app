import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { AccountProvider } from '../../providers/account';

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

	loader;

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
	
	newAccount;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController, public loginProvider: LoginProvider, public loadCtrl: LoadingController, public acctProvider: AccountProvider, public alertCtrl: AlertController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateAccountPage');
	}
	
	submit() {
		this.loader = this.loadCtrl.create({
      		content: "Loading..."
    	});
    	this.loader.present();
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		this.http.post("https://auctionitapi.azurewebsites.net/api/accounts/" + this.loginProvider.creds.apiKey + "/create", JSON.stringify(this.account), {headers: headers})
		.subscribe(
			res => this.newAccount = res.json(),
			(err) => {},
			() => {
				this.acctProvider.loadAllAccounts()
				.then(() => {
					this.loader.dismiss();
					this.viewCtrl.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Dealer created',
						subTitle: this.newAccount.owner,
						buttons: ['OK'],
						enableBackdropDismiss: false
					});
					alert.present();
				});
			}
		);
	}
	
	cancel() {
		this.viewCtrl.dismiss();
	}

}
