import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public items;

  constructor(db: AngularFireDatabase) {
    db.list('/parsed_bets').valueChanges().subscribe(
      (datas) => {
        this.items = datas;
        console.log("datas", datas) }
    );
  }
}
