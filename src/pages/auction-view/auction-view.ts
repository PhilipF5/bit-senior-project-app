import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuctionProvider } from '../../providers/auction';
import { LotPage } from '../../pages/lot/lot';

/*
  Generated class for the AuctionView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
 	selector: 'page-auction-view',
 	templateUrl: 'auction-view.html'
})

export class AuctionViewPage {

	lotPage;

	constructor(public navCtrl: NavController, public loadCtrl: LoadingController, public navParams: NavParams, public auctionProvider: AuctionProvider) {
		this.lotPage = LotPage;
		
		let loader = this.loadCtrl.create({
      		content: "Loading..."
    	});
    	loader.present();
		
		console.log(this.navParams.get('auctionID'));
		
		auctionProvider.loadAuction(this.navParams.get('auctionID'))
		.then(() => {
			loader.dismiss();
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AuctionViewPage');
	}

}
