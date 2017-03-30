import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

	newUser = {
		firstName: null,
		lastName: null,
		username: null
	}
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateProfilePage');
	}
	
	cancel() {
		this.viewCtrl.dismiss();
	}

}
