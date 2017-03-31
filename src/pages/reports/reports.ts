import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { Chart } from 'chart.js';
import * as randomColor from 'randomcolor';

/*
  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-reports',
	templateUrl: 'reports.html'
})

export class ReportsPage {

	@ViewChild('statesCanvas') statesCanvas;
	@ViewChild('typesCanvas') typesCanvas;
	@ViewChild('modelsCanvas') modelsCanvas;
	statesChart: any;
	typesChart: any;
	modelsChart: any;
	statesData: any;
	typesData: any;
	modelsData: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loginProvider: LoginProvider) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ReportsPage');
		this.loadStatesData()
		.then(() => { this.loadTypesData(); })
		.then(() => { this.loadModelsData(); });
	}
	
	loadStatesData() {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/states")
			.subscribe(
				res => this.statesData = res.json(),
				(err) => {},
				() => {
					this.loadStatesChart();
					resolve();
				}
			);
		});
	}
	
	loadTypesData() {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/types")
			.subscribe(
				res => this.typesData = res.json(),
				(err) => {},
				() => {
					this.loadTypesChart();
					resolve();
				}
			);
		});
	}
	
	loadModelsData() {
		return new Promise((resolve, reject) => {
			this.http.get("http://auctionitapi.azurewebsites.net/api/auctions/" + this.loginProvider.creds.apiKey + "/models")
			.subscribe(
				res => this.modelsData = res.json(),
				(err) => {},
				() => {
					this.loadModelsChart();
					resolve();
				}
			);
		});
	}
	
	loadStatesChart() {
		this.statesChart = new Chart(this.statesCanvas.nativeElement, {
        	type: 'doughnut',
        	options: {
				legend: {
					position: 'bottom'
				},
				layout: { padding: 10 }
			},
			data: {
				labels: this.statesData.stateNames,
				datasets: [{
    				label: "Test",
					data: this.statesData.salesByVolume,
					//test data
					//data: [456,83,583,53,693,29,593,280,385,22,495,231,523,25,354,323,54,346],
					backgroundColor: randomColor({
						count: this.statesData.stateNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: this.statesData.stateNames.length,
						luminosity: "light"
					}),
					borderWidth: 1
				}]
			}
        });
	}
	
	loadTypesChart() {
		this.typesChart = new Chart(this.typesCanvas.nativeElement, {
        	type: 'bar',
        	options: {
				legend: {
					display: false
				},
				layout: { padding: 10 }
			},
			data: {
				labels: this.typesData.typeNames,
				datasets: [{
    				label: "Test",
					data: this.typesData.salesByVolume,
					backgroundColor: randomColor({
						count: this.typesData.typeNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: this.typesData.typeNames.length,
						luminosity: "light"
					}),
				}]
			}
        });
	}
	
	loadModelsChart() {
		this.modelsChart = new Chart(this.modelsCanvas.nativeElement, {
        	type: 'horizontalBar',
        	options: {
				legend: {
					display: false
				},
				layout: { padding: 10 },
				maintainAspectRatio: false
			},
			data: {
				labels: this.modelsData.modelNames,
				datasets: [{
    				label: "Test",
					data: this.modelsData.salesByVolume,
					backgroundColor: randomColor({
						count: this.modelsData.modelNames.length,
						luminosity: "bright"
					}),
					hoverBackgroundColor: randomColor({
						count: this.modelsData.modelNames.length,
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

}
