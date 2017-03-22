import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { LoginPage } from '../../pages/login/login'

/*
  Generated class for the AdminHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-admin-home',
	templateUrl: 'admin-home.html'
})
export class AdminHomePage {

	@ViewChild('donutCanvas') donutCanvas;
	donutChart: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
		let modal = this.modalCtrl.create(LoginPage, {}, {enableBackdropDismiss: false});
		modal.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AdminHomePage');
		this.donutChart = new Chart(this.donutCanvas.nativeElement, {
			type: 'doughnut',
			options: { legend: { position: 'bottom' }, layout: { padding: 10 }},
			data: {
				labels: ["Virginia", "New York", "Illinois", "South Carolina", "Ohio", "New Jersey"],
				datasets: [{
					label: "Test",
					data: [750, 1147, 675, 432, 703, 450],
					backgroundColor: [
						'rgba(255, 99, 132, 0.8)',
						'rgba(54, 162, 235, 0.8)',
						'rgba(255, 206, 86, 0.8)',
						'rgba(75, 192, 192, 0.8)',
						'rgba(153, 102, 255, 0.8)',
						'rgba(255, 159, 64, 0.8)'
					],
					hoverBackgroundColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					]
				}]
			}
		});
	}

}
