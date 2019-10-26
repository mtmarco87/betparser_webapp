import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { CoreState } from 'app/core/state/core.state.ts';
import { MatchPaginationService } from 'app/core/api/match-pagination/match-pagination.service';
import { MatchGroup } from './models/MatchGroup';
import { SureBet } from './models/SureBet';


@Injectable({
    providedIn: 'root'
})
export class BetsFacade {

    constructor(private coreState: CoreState, private api: MatchPaginationService) { }

    // Function to ask the core service the scroll status
    getScrollStatus(): Observable<string> {
        return this.coreState.getScrollStatus();
    }

    // Function to ask the service to paginate some more Matches
    requestMoreMatchGroups() {
        this.api.more();
    }

    // Function to get the retrieved Matches (until now)
    getMatchGroups(): Observable<MatchGroup[]> {
        // Just pass-through the API State value
        return this.api.data.pipe(
            map(dbItems => {
                return this.sortMatchGroups(MatchGroup.createManyFromDb(dbItems));
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
        // Just pass-through the API State value
        return this.api.allData.pipe(map(dbItems => {
            return this.extractSureBets(MatchGroup.createManyFromDb(dbItems));
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
}
