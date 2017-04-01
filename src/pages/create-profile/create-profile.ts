import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { AccountProvider } from '../../providers/account';
import { ProfileProvider } from '../../providers/profile';

/*
  Generated class for the CreateProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-create-profile',
	templateUrl: 'create-profile.html'
})

export class CreateProfilePage {

	loader;
	
	user = {
		firstName: null,
		lastName: null,
		username: null,
		accountID: null
	}
	
	newUser;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController, public loginProvider: LoginProvider, public acctProvider: AccountProvider, public loadCtrl: LoadingController, public profileProvider: ProfileProvider, public alertCtrl: AlertController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateProfilePage');
	}
	
	submit() {
		this.loader = this.loadCtrl.create({
      		content: "Loading..."
    	});
    	this.loader.present();
		this.user.accountID = this.acctProvider.selectedAcctID;
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		this.http.post("http://localhost:5000/api/profiles/" + this.loginProvider.creds.apiKey + "/create", JSON.stringify(this.user), {headers: headers})
		.subscribe(
			res => this.newUser = res.json(),
			(err) => {},
			() => {
				this.acctProvider.loadAllAccounts()
				.then(() => this.profileProvider.loadAllProfiles())
				.then(() => {
					this.loader.dismiss();
					this.viewCtrl.dismiss();
					let alert = this.alertCtrl.create({
						title: 'User ' + this.newUser.item1 + ' created',
						subTitle: 'Provide them this auth key to log in:  ' + this.newUser.item2,
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
