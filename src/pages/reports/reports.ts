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

	@ViewChild('modelsCanvas') modelsCanvas;
	@ViewChild('statesCanvas') statesCanvas;
	@ViewChild('typesCanvas') typesCanvas;

	// Constructor injects all base view and data service dependencies
	constructor(public dataSrv: DataProvider, public alertCtrl: AlertController, public loadCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public viewCtrl: ViewController) {
		// Pass along to the base view constructor
		super(alertCtrl, loadCtrl, modalCtrl, navCtrl, navParams, toastCtrl, viewCtrl);
	}

	ionViewDidLoad() {
		this.dataSrv.loadChartsDataModels()
		.then(() => this.dataSrv.loadChartsDataStates())
		.then(() => this.dataSrv.loadChartsDataTypes())
		.then(() => {
			this.loadModelsChart(this.modelsCanvas, this.dataSrv.chartData.models);
			this.loadStatesChart(this.statesCanvas, this.dataSrv.chartData.states);
			this.loadTypesChart(this.typesCanvas, this.dataSrv.chartData.types);
		});
	}

}
