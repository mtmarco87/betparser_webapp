import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { BetsState } from './state/bets.state';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatchGroup } from './models/MatchGroup';
import { SureBet } from './models/SureBet';


@Injectable({
    providedIn: 'root'
})
export class BetsFacade {
    readonly dbRoot = '/parsed_bets';
    initialized: boolean = false;

    constructor(private betsState: BetsState, private firebaseDb: AngularFireDatabase) { }

    initializeDbConnection() {
        if (!this.initialized) {
            this.firebaseDb.list(this.dbRoot).snapshotChanges().pipe(
                map(dbItems => {
                    return MatchGroup.createManyFromDb(dbItems);
                })).subscribe(
                    (matchGroups) => {
                        this.betsState.setMatchGroups(matchGroups);
                        this.betsState.setSureBets(this.extractSureBets(matchGroups));
                        // console.log("New MatchGroups: ", matchGroups);
                    }
                );
        } else {
            console.warn("FirebaseDB already initialized!");
        }
    }

    getMatchGroups(): Observable<MatchGroup[]> {
        // Just pass-through the State value
        return this.betsState.getMatchGroups();
    }

    getSureBets(): Observable<SureBet[]> {
        // Just pass-through the State value
        return this.betsState.getSureBets();
    }

    extractSureBets(matchGroups: MatchGroup[]): SureBet[] {
        let sureBets: SureBet[] = [];

        matchGroups.forEach(matchGroup => {
            matchGroup.children.forEach(match => {
                if (match.isSureBet()) {
                    const maxQuote1AndBookmaker = match.getMaxQuoteAndBookmaker('1');
                    const maxQuoteXAndBookmaker = match.getMaxQuoteAndBookmaker('X');
                    const maxQuote2AndBookmaker = match.getMaxQuoteAndBookmaker('2');

                    sureBets.push(new SureBet(match.Name, match.getStartDateTime(), maxQuote1AndBookmaker[0], maxQuote1AndBookmaker[1],
                        maxQuoteXAndBookmaker[0], maxQuoteXAndBookmaker[1], maxQuote2AndBookmaker[0], maxQuote2AndBookmaker[1],
                        match.getOddsInverseSum(), match.getSureBetPercent()));
                }
            });
        });

        sureBets.sort((a, b) => a.OddsInverseSum - b.OddsInverseSum);

        return sureBets;
    }
}
