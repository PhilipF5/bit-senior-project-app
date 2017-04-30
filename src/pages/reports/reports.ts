/*
	Reports Page
	============
	Shows graphical statistics for admins.
*/

// Standard page stuff
import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

// Import base view and main data service
import { BaseView } from '../../app/base-view';
import { DataProvider } from '../../providers/data';

// Import needed libraries
import { Chart } from 'chart.js';
import * as randomColor from 'randomcolor';

@Component({
	selector: 'page-reports',
	templateUrl: 'reports.html'
})
export class ReportsPage extends BaseView {
	
	// Grab canvas elements from HTML
	@ViewChild('modelsCanvas') modelsCanvas;
	@ViewChild('statesCanvas') statesCanvas;
	@ViewChild('typesCanvas') typesCanvas;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}
	
	// Fires when the page has loaded
	ionViewDidLoad() {
		this.createLoader("Loading...");
		// Load each chart's data in sequence
		this.dataSrv.loadChartsDataModels()
		.then(() => this.dataSrv.loadChartsDataStates())
		.then(() => this.dataSrv.loadChartsDataTypes())
		.then(() => {
			// Put the data into the charts
			this.loadModelsChart(this.modelsCanvas, this.dataSrv.chartData.models);
			this.loadStatesChart(this.statesCanvas, this.dataSrv.chartData.states);
			this.loadTypesChart(this.typesCanvas, this.dataSrv.chartData.types);
			this.dismissLoader();
		});
	}

}
