import { Component, OnInit } from "@angular/core";
import { MatchGroup } from '../../models/MatchGroup';
import { QuoteGroupType } from '../../models/QuoteGroupType';
import { BetsFacade } from '../../bets.facade';
import { Subscription } from 'rxjs';


@Component({
  selector: "app-bets-analysis",
  templateUrl: "bets-analysis.component.html",
  styleUrls: ['./bets-analysis.component.scss']
})
export class BetsAnalysisComponent implements OnInit {
  quoteGroupTypes: QuoteGroupType[] = QuoteGroupType.defaultTypes;
  matchGroups: MatchGroup[];
  private onScrollSubscription: Subscription = null;
  private getMatchesSubscription: Subscription = null;

  constructor(private betsFacade: BetsFacade) { }

  ngOnInit() {
    // Subscription to page scroll to bottom event: Retrieve of some other elements at each interaction
    this.onScrollSubscription = this.betsFacade.getScrollStatus().subscribe(scrollStatus => {
      if (scrollStatus === "bottom") {
        this.betsFacade.requestMoreMatchGroups();
      }
    });

    // Subscription to retrieved Matches
    this.getMatchesSubscription = this.betsFacade.getMatchGroups().subscribe((newMatchGroups) => this.matchGroups = newMatchGroups);
  }

  ngOnDestroy() {
    this.onScrollSubscription.unsubscribe();
    this.getMatchesSubscription.unsubscribe();
  }
}
