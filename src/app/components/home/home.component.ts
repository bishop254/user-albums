import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards: any = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userServ: UserInfoService
  ) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Card 1', cols: 1, rows: 1 },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 1 },
          ];
        }

        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 2 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      })
    );
  }

  ngOnInit() {
    this.userServ.getUsers().subscribe((resp) => {
      console.log(resp);
      this.cards = resp;
      console.log('this.cards');
      console.log(this.cards);

      this.cards.map((card: any) => {
        this.userServ.getUserAlbums(card.id).subscribe((res) => {
          card['albumCount'] = res.length;
        });
      });
    });
  }
}
