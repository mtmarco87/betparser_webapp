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
                        this.betsState.setMatchGroups(this.sortMatchGroups(matchGroups));
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

    sortMatchGroups(matchGroups: MatchGroup[]): MatchGroup[] {
        // We sort each MatchGroup descending for number of available bookmaker quotes
        matchGroups.forEach(matchGroup => {
            matchGroup.children.sort((a, b) => b.children.length - a.children.length)
        });

        return matchGroups;
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
