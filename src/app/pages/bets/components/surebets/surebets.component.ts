import { Component, OnInit } from "@angular/core";
import { BetsFacade } from '../../bets.facade';
import { SureBet } from '../../models/SureBet';
import { Subscription } from 'rxjs';


@Component({
  selector: "app-surebets",
  templateUrl: "surebets.component.html",
  styleUrls: ['./surebets.component.scss']
})
export class SureBetsComponent implements OnInit {
  sureBets: SureBet[];
  private getSureBetsSubscription: Subscription = null;

  constructor(private betsFacade: BetsFacade) { }

  ngOnInit() {
    this.getSureBetsSubscription = this.betsFacade.getSureBets().subscribe((newSureBets) => this.sureBets = newSureBets);
  }

  ngOnDestroy() {
    this.getSureBetsSubscription.unsubscribe();
  }
}
