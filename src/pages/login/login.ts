import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { AccountProvider } from '../../providers/account';
import { ProfileProvider } from '../../providers/profile';
import { AuctionProvider } from '../../providers/auction';
import { Http, Headers } from '@angular/http';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {

	username: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public profileProvider: ProfileProvider, public auctionProvider: AuctionProvider, public viewCtrl: ViewController, public loadCtrl: LoadingController, public http: Http) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {
		let loader = this.loadCtrl.create({
      		content: "Logging in..."
    	});
    	loader.present();
		console.log("Logging in with username " + this.username + " ...");
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		this.http.post("http://auctionitapi.azurewebsites.net/api/login", JSON.stringify(this.username + ' ' + this.password), {headers: headers})
		.subscribe(
			res => this.loginProvider.creds = res.json(),
			(err) => {},
			() => {
				if (this.loginProvider.creds.apiKey != null) {
					if (this.loginProvider.creds.role == "user") {
						Promise.all([
							this.acctProvider.loadMyAccount(),
							this.profileProvider.loadMyProfile(),
							this.auctionProvider.loadAllAuctions()
						]).then(() => {
							loader.dismiss();
							this.viewCtrl.dismiss();
						});
					}
					else if (this.loginProvider.creds.role == "admin") {
						Promise.all([
							this.auctionProvider.loadAllAuctions(),
							this.acctProvider.loadAllAccounts().then(() => {
								this.profileProvider.loadAllProfiles();
							})
						]).then(() => {
							loader.dismiss();
							this.viewCtrl.dismiss();
						})
					}
				}
			}
		);
	}

}
