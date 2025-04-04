import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements AfterViewInit {

  stats: any;
  expenses: any;
  incomes: any;
  incomeChart: any;
  expenseChart: any;
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  @ViewChild('incomeLineChartRef') incomeLineChartRef!: ElementRef;
  @ViewChild('expenseLineChartRef') expenseLineChartRef!: ElementRef;

  constructor(
    private statsService: StatsService,
    private cdr: ChangeDetectorRef
  ) {
    this.getStats();
  }

  ngAfterViewInit(): void {
    this.getChartData();
  }

  createLineChart() {
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }
    if (this.expenseChart) {
      this.expenseChart.destroy();
    }

    const incomeCtx = this.incomeLineChartRef.nativeElement.getContext('2d');
    this.incomeChart = new Chart(incomeCtx, {
      type: 'line',
      data: {
        labels: this.incomes.map(income => income.date),
        datasets: [{
          label: 'Income',
          data: this.incomes.map(income => income.amount),
          borderWidth: 1,
          backgroundColor: 'rgb(80, 200, 120)',
          borderColor: 'rgb(0, 100, 0)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const expenseCtx = this.expenseLineChartRef.nativeElement.getContext('2d');
    this.expenseChart = new Chart(expenseCtx, {
      type: 'line',
      data: {
        labels: this.expenses.map(expense => expense.date),
        datasets: [{
          label: 'Expense',
          data: this.expenses.map(expense => expense.amount),
          borderWidth: 1,
          backgroundColor: 'rgb(255, 0, 0)',
          borderColor: 'rgb(100, 0, 0)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getStats() {
    this.statsService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  getChartData() {
    this.statsService.getChart().subscribe(res => {
      if (res.expenseList != null && res.incomeList != null) {
        this.incomes = res.incomeList;
        this.expenses = res.expenseList;
        this.createLineChart();
        this.cdr.detectChanges();
      }
    });
  }
}
