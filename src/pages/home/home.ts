import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { LoginPage } from '../../pages/login/login';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})

export class HomePage {

	constructor(public navCtrl: NavController, public loginProvider: LoginProvider, public modalCtrl: ModalController) {
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.present();
 	}

}
