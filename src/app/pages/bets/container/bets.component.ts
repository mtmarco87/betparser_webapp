import { Component, OnInit } from "@angular/core";
import { BetsFacade } from '../bets.facade';


@Component({
    selector: "app-bets",
    templateUrl: "bets.component.html"
})
export class BetsComponent implements OnInit {
    constructor(private betsFacade: BetsFacade) {
        this.betsFacade.initializeDbConnection();
    }

    ngOnInit() { }
}
