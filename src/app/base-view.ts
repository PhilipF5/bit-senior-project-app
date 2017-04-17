// Import graphics features
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';
import * as randomColor from 'randomcolor';

export class BaseView {

	public loader: any;

	constructor(public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		
	}
	
	public createLoader(message: string) {
		this.loader = this.loadCtrl.create({
      		content: message
    	});
    	this.loader.present();
	}
	
	public dismissLoader() {
		this.loader.dismiss();
	}
	
	public dismissView() {
		this.viewCtrl.dismiss();
	}
	
	public showAlert(title: string, subtitle: string) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: subtitle,
			buttons: [ 'OK' ]
		});
		alert.present();
	}

}
