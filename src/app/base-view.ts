/*
	Parent Class for Pages
	======================
	Contains chart, color, and controller view functions
	that need to be shared among multiple pages.
*/

// Import graphics features
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';
import * as randomColor from 'randomcolor';

export class BaseView {

	// Global properties
	public loader: any;
	public modelsChart: any;
	public statesChart: any;
	public typesChart: any;

	// Standard constructor that injects all the controllers
	constructor(public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// We don't actually need to do anything here right now
	}
	
	// Create spinning loader overlay with message
	public createLoader(message: string) {
		this.loader = this.loadCtrl.create({
      		content: message
    	});
    	this.loader.present();
	}
	
	// Dismiss any loader that's active
	public dismissLoader() {
		this.loader.dismiss();
	}
	
	// Dismiss modals and other view overlays
	public dismissView() {
		this.viewCtrl.dismiss();
	}
	
	// Load the "Sales by Model" chart into a canvas
	public loadModelsChart(canvas: any, data: any) {
		this.modelsChart = new Chart(canvas.nativeElement, {
        	type: 'horizontalBar',
        	options: {
				legend: {
					display: false
				},
				layout: { padding: 10 },
				maintainAspectRatio: false
			},
			data: {
				labels: data.modelNames,
				datasets: [{
    				label: "Test",
					data: data.salesByVolume,
					// Use randomColor to generate the colors we need
					backgroundColor: randomColor({
						count: data.modelNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: data.modelNames.length,
						luminosity: "light"
					}),
					scales: {
						yAxes: [{
							barThickness: 20
						}]
					}
				}]
			}
        });
	}
	
	// Load the "Sales by State" chart into a canvas
	public loadStatesChart(canvas: any, data: any) {
		this.statesChart = new Chart(canvas.nativeElement, {
        	type: 'doughnut',
        	options: {
				legend: {
					position: 'bottom'
				},
				layout: { padding: 10 }
			},
			data: {
				labels: data.stateNames,
				datasets: [{
    				label: "Test",
					data: data.salesByVolume,
					// Use randomColor to generate the colors we need
					backgroundColor: randomColor({
						count: data.stateNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: data.stateNames.length,
						luminosity: "light"
					}),
					borderWidth: 1
				}]
			}
        });
	}
	
	// Load the "Sales by Type" chart into a canvas
	public loadTypesChart(canvas: any, data: any) {
		this.typesChart = new Chart(canvas.nativeElement, {
        	type: 'bar',
        	options: {
				legend: {
					display: false
				},
				layout: { padding: 10 }
			},
			data: {
				labels: data.typeNames,
				datasets: [{
    				label: "Test",
					data: data.salesByVolume,
					// Use randomColor to generate the colors we need
					backgroundColor: randomColor({
						count: data.typeNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: data.typeNames.length,
						luminosity: "light"
					}),
				}]
			}
        });
	}
	
	// Show a simple popup alert with an OK button
	public showAlert(title: string, subtitle: string) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: subtitle,
			buttons: [ 'OK' ]
		});
		alert.present();
	}

}
