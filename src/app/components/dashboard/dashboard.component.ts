import { Component } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  stats: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  }

  constructor (
    private statsService: StatsService,
  ) {
    this.getStats();
  }

  getStats() {
    this.statsService.getStats().subscribe(
      res => {
        this.stats = res;
      }
    )
  }
}
