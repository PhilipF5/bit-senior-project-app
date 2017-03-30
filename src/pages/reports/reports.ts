import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ReportsPage');
		this.loadStatesChart();
		this.loadTypesChart();
		this.loadModelsChart();
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
				labels: [
					"Virginia",
					"New York",
					"Illinois",
					"South Carolina",
					"Ohio",
					"New Jersey"
				],
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
	
	loadTypesChart() {
		this.typesChart = new Chart(this.typesCanvas.nativeElement, {
        	type: 'bar',
        	options: {
				legend: {
					position: 'bottom'
				},
				layout: { padding: 10 }
			},
			data: {
				labels: [
					"Coupe",
					"Sedan",
					"SUV",
					"Truck",
					"Van"
				],
				datasets: [{
    				label: "Test",
					data: [750, 1147, 675, 432, 703, 450],
					backgroundColor: [
    					'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
					],
					hoverBackgroundColor: [
    					'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
					]
				}]
			}
        });
	}
	
	loadModelsChart() {
		this.modelsChart = new Chart(this.modelsCanvas.nativeElement, {
        	type: 'bar',
        	options: {
				legend: {
					position: 'bottom'
				},
				layout: { padding: 10 }
			},
			data: {
				labels: [
					"Toyota Camry",
					"Ford Fusion",
					"Honda CX-3",
					"Lincoln MKS",
					"Chevrolet Bolt",
					"BMW i3"
				],
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
