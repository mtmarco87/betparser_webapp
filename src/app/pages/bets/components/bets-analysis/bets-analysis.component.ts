import { Component, OnInit } from "@angular/core";
import { MatchGroup } from '../../models/MatchGroup';
import { QuoteGroupType } from '../../models/QuoteGroupType';
import { BetsFacade } from '../../bets.facade';
import { Subscription } from 'rxjs';
import { AppSettings } from 'app/core/models/AppSettings';
import { SharedUtils } from 'app/shared/utils/shared.utils';
import { MatchFilter } from '../../models/MatchFilter';


@Component({
  selector: "app-bets-analysis",
  templateUrl: "bets-analysis.component.html",
  styleUrls: ['./bets-analysis.component.scss']
})
export class BetsAnalysisComponent implements OnInit {
  quoteGroupTypes: QuoteGroupType[] = QuoteGroupType.defaultTypes;
  matchGroups: MatchGroup[];
  private totalMatches: number;
  private searchText: string;
  private getScrollBottomSubscription: Subscription = null;
  private getMatchesSubscription: Subscription = null;
  private getMatchesCountSubscription: Subscription = null;
  private getSearchTextSubscription: Subscription = null;


  constructor(private betsFacade: BetsFacade) { }

  ngOnInit() {
    // Subscription to page scroll to bottom event: Retrieve of some other elements at each interaction
    this.getScrollBottomSubscription = this.betsFacade.getScrollBottomStatus().subscribe(() => {
      this.betsFacade.requestMoreMatchGroups();
    });

    // Subscription to paginated/filtered Matches
    this.getMatchesSubscription = this.betsFacade.getMatchGroups().subscribe((newMatchGroups) => {
      this.matchGroups = newMatchGroups;
      this.updateInfobar();
    });

    // Subsctiption to total Matches count
    this.getMatchesCountSubscription = this.betsFacade.getTotalMatches().subscribe((count) => {
      this.totalMatches = count;
      this.updateInfobar();
    });

    // Subscription to user search action. Specific page search implementation
    this.getSearchTextSubscription = this.betsFacade.getSearchText().subscribe((searchText) => {
      const filter = new MatchFilter();
      if (searchText !== null && searchText.trim() !== '') {
        this.searchText = searchText;
        const splittedSearch = searchText.split(',');
        filter.All = splittedSearch;
      }
      else {
        this.searchText = null;
      }
      this.betsFacade.requestMoreMatchGroups(filter);
    });
  }

  updateInfobar() {
    let message = '';
    if (this.totalMatches === undefined || this.totalMatches === null || this.totalMatches === 0) {
      // message = AppSettings.NotFoundMatchesMsg;
      return;
    }
    else {
      let displayedMatches = this.getDisplayedMatchesCount();
      if (this.searchText !== null && this.searchText.trim() !== '') {
        const cleanedSearchText = this.searchText.split(',').map(search => { return search.trim(); }).join(', ');
        message = SharedUtils.sprintf(AppSettings.SearchFoundMatchesMsg, displayedMatches, cleanedSearchText);
      }
      else {
        message = SharedUtils.sprintf(AppSettings.FoundMatchesMsg, this.totalMatches);
      }
    }

    this.betsFacade.setInfobarMessage(message);
  }

  getDisplayedMatchesCount(): number {
    let displayedMatches = 0;
    this.matchGroups.forEach(matchGroup => {
      displayedMatches += matchGroup.children.length;
    });

    return displayedMatches;
  }

  ngOnDestroy() {
    this.getScrollBottomSubscription.unsubscribe();
    this.getMatchesSubscription.unsubscribe();
    this.getMatchesCountSubscription.unsubscribe();
    this.getSearchTextSubscription.unsubscribe();
    this.betsFacade.setInfobarMessage('');
  }
}
