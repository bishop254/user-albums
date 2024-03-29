import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Landing', content: 'Welcome', cols: 2, rows: 1 },
          { title: 'Login', content: 'Login', cols: 1, rows: 1 },
          { title: 'Logs', content: 'Logs', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Landing', content: 'Welcome', cols: 1, rows: 2 },
        { title: 'Login', content: 'Login', cols: 1, rows: 1 },
        { title: 'Logs', content: 'Logs', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
