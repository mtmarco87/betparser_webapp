import { Component, OnInit } from "@angular/core";
import { BetsFacade } from '../../bets.facade';
import { SureBet } from '../../models/SureBet';


@Component({
  selector: "app-surebets",
  templateUrl: "surebets.component.html",
  styleUrls: ['./surebets.component.scss']
})
export class SureBetsComponent implements OnInit {
  sureBets: SureBet[];

  constructor(private betsFacade: BetsFacade) { }

  ngOnInit() {
    this.betsFacade.getSureBets().subscribe((newSureBets) => this.sureBets = newSureBets);
  }
}
