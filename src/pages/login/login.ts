import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage extends BaseView {

	public username: string;
	public password: string;

	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	public login() {
		this.createLoader("Logging in...");
		this.dataSrv.login(this.username, this.password)
		.then(
			() => {
				this.dismissLoader();
				this.dismissView();
			},
			(err) => {
				this.dismissLoader();
				this.showAlert("Login failed", err);
			}
		);
	}

}
