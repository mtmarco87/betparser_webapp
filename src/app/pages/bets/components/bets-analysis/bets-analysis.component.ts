import { Component, OnInit } from "@angular/core";
import { MatchGroup } from '../../models/MatchGroup';
import { QuoteGroupType } from '../../models/QuoteGroupType';
import { BetsFacade } from '../../bets.facade';
import { Subscription, BehaviorSubject } from 'rxjs';
import { match } from 'minimatch';
import { AppSettings } from 'app/core/models/AppSettings';
import { SharedUtils } from 'app/shared/utils/shared.utils';


@Component({
  selector: "app-bets-analysis",
  templateUrl: "bets-analysis.component.html",
  styleUrls: ['./bets-analysis.component.scss']
})
export class BetsAnalysisComponent implements OnInit {
  quoteGroupTypes: QuoteGroupType[] = QuoteGroupType.defaultTypes;
  matchGroups: MatchGroup[];
  private retrievedMatches: number;
  private totalMatches: number;
  private onScrollSubscription: Subscription = null;
  private getMatchesSubscription: Subscription = null;
  private getMatchesCountSubscription: Subscription = null;


  constructor(private betsFacade: BetsFacade) { }

  ngOnInit() {
    // Subscription to page scroll to bottom event: Retrieve of some other elements at each interaction
    this.onScrollSubscription = this.betsFacade.getScrollBottomStatus().subscribe(() => {
      this.betsFacade.requestMoreMatchGroups();
    });

    // Subscription to retrieved Matches
    this.getMatchesSubscription = this.betsFacade.getMatchGroups().subscribe((newMatchGroups) => {
      this.retrievedMatches = 0;
      newMatchGroups.forEach((matchGroup) => {
        this.retrievedMatches += matchGroup.children.length;
      });
      this.updateInfoBar();

      this.matchGroups = newMatchGroups;
    });

    // Subsctiption to total Matches count
    this.getMatchesCountSubscription = this.betsFacade.getTotalMatches().subscribe((count) => {
      this.totalMatches = count;
      this.updateInfoBar();
    });
  }

  updateInfoBar() {
    if (this.retrievedMatches === undefined || this.retrievedMatches === 0 ||
      this.totalMatches === undefined || this.totalMatches === 0) {
      return;
    }
    this.betsFacade.setInfoBarStatus(SharedUtils.sprintf(AppSettings.ShowingMatchesMsg, this.retrievedMatches, this.totalMatches));
  }

  ngOnDestroy() {
    this.onScrollSubscription.unsubscribe();
    this.getMatchesSubscription.unsubscribe();
    this.getMatchesCountSubscription.unsubscribe();
    this.betsFacade.setInfoBarStatus('');
  }
}
