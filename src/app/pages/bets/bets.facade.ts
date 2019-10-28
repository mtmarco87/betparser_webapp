import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, filter } from 'rxjs/operators';
import { CoreState } from 'app/core/state/core.state';
import { MatchPaginationService } from 'app/pages/bets/api/match-pagination/match-pagination.service';
import { MatchGroup } from './models/MatchGroup';
import { SureBet } from './models/SureBet';
import { MatchFilter } from './models/MatchFilter';


@Injectable({
    providedIn: 'root'
})
export class BetsFacade {

    constructor(private coreState: CoreState, private api: MatchPaginationService) { }

    // Function to get an observable on the scrolledBottom status (via core service)
    getScrollBottomStatus(): Observable<string> {
        return this.coreState.getScrollStatus().pipe(filter((scrollEvent) => scrollEvent === CoreState.scrolledBottom));
    }

    // Function to ask the service to paginate some more Matches
    requestMoreMatchGroups(filter?: MatchFilter): void {
        this.api.more(filter);
    }

    // Function to get the paginated/filtered Matches
    getMatchGroups(): Observable<MatchGroup[]> {
        // Take the API paginated/filtered Matches and sort them
        return this.api.data.pipe(
            map(matchGroups => {
                return this.sortMatchGroups(matchGroups);
            }));
    }

    sortMatchGroups(matchGroups: MatchGroup[]): MatchGroup[] {
        // Here we sort the Matches in MatchGroup, by descending number of available bookmaker quotes
        matchGroups.forEach(matchGroup => {
            matchGroup.children.sort((a, b) => b.children.length - a.children.length)
        });

        return matchGroups;
    }

    // Function to get all the Sure Bets found (if any)
    getSureBets(): Observable<SureBet[]> {
        // Take all Matches from the API state and transform it into Sure Bets list
        return this.api.allData.pipe(map(matchGroups => {
            return this.extractSureBets(matchGroups);
        }));
    }

    extractSureBets(matchGroups: MatchGroup[]): SureBet[] {
        let sureBets: SureBet[] = [];

        matchGroups.forEach(matchGroup => {
            matchGroup.children.forEach(match => {
                sureBets = sureBets.concat(match.getSureBets());
            });
        });

        sureBets.sort((a, b) => a.OddsInverseSum - b.OddsInverseSum);

        return sureBets;
    }

    // Function to get the total count of the retrieved Matches
    getTotalMatches(): Observable<number> {
        // Just pass-through API data
        return this.api.allDataCount;
    }

    // Function to set an Infobar Message
    setInfobarMessage(msg: string): void {
        // Send new text to the Infobar (putting it in the stack)
        this.coreState.setInfobarMessage(msg);
    }

    // Function to get a new Search Text
    getSearchText(): Observable<string> {
        // Just pass-through the Core state observable
        return this.coreState.getSearchText();
    }
}
