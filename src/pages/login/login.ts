import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';


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

constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public viewCtrl: ViewController, public http: Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
	
login() {
	console.log("Logging in with username " + this.username + " ...");
	var headers = new Headers();
	headers.append("Content-Type", "application/json");
	this.http.post("http://auctionitapi.azurewebsites.net/api/login/mobile", JSON.stringify(this.username + ' ' + this.password), {headers: headers})
.subscribe(res => this.loginProvider.creds = res.json(), (err) => {}, () => {
		if (this.loginProvider.creds.apiKey != null)
			{
	this.viewCtrl.dismiss();
			}
	});
}

}
