import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MatchGroup } from '../models/MatchGroup';
import { SureBet } from '../models/SureBet';


@Injectable({
    providedIn: 'root',
})
export class BetsState {
    private matchGroups$ = new BehaviorSubject<MatchGroup[]>(null);
    private sureBets$ = new BehaviorSubject<SureBet[]>(null);

    getMatchGroups(): Observable<MatchGroup[]> {
        return this.matchGroups$.asObservable();
    }

    setMatchGroups(matchGroups: MatchGroup[]) {
        this.matchGroups$.next(matchGroups);
    }

    getSureBets(): Observable<SureBet[]> {
        return this.sureBets$.asObservable();
    }

    setSureBets(sureBets: SureBet[]) {
        this.sureBets$.next(sureBets);
    }

}
