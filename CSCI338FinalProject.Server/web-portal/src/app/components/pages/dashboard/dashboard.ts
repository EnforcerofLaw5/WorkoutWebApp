import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  template: `<canvas id="progressChart"></canvas>`
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    new Chart("progressChart", {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
          { label: 'Volume', data: [1200, 1500, 900, 1800, 2100] }
        ]
      }
    });
  }
}
