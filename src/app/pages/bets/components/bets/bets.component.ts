import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Component({
  selector: "app-bets",
  templateUrl: "bets.component.html"
})
export class BetsComponent implements OnInit {
  matches: Object[];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.db.list('/parsed_bets').snapshotChanges().pipe(
      map(matches => {
        return matches.map(match => {
          const key = match.key;
          const data = match.payload.val();
          return { key, data };
        });
      })).subscribe(
        (matches) => {
          this.matches = matches;
          console.log("db matches", matches)
        }
      );
  }
}
