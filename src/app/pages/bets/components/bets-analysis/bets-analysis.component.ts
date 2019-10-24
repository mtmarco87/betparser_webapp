import { Component, OnInit } from "@angular/core";
import { MatchGroup } from '../../models/MatchGroup';
import { QuoteGroupType } from '../../models/QuoteGroupType';
import { BetsFacade } from '../../bets.facade';


@Component({
  selector: "app-bets-analysis",
  templateUrl: "bets-analysis.component.html",
  styleUrls: ['./bets-analysis.component.scss']
})
export class BetsAnalysisComponent implements OnInit {
  quoteGroupTypes: QuoteGroupType[] = QuoteGroupType.defaultTypes;
  matchGroups: MatchGroup[];

  constructor(private betsFacade: BetsFacade) { }

  ngOnInit() {
    this.betsFacade.getMatchGroups().subscribe((newMatchGroups) => this.matchGroups = newMatchGroups);
  }
}
