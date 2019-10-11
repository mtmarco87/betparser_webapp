import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css']
})
export class BetsListComponent implements OnInit {
  
  public items;

  constructor(db: AngularFireDatabase) {
    db.list('/parsed_bets').valueChanges().subscribe(
      (datas) => {
        this.items = datas;
        console.log("datas", datas) }
    );
   }

  ngOnInit() {
  }

}
