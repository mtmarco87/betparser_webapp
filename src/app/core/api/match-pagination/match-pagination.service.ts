import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CoreState } from 'app/core/state/core.state';


@Injectable({
  providedIn: 'root'
})
export class MatchPaginationService {

  private readonly dbRoot: string = "/parsed_bets";

  // Source data
  private _done = new BehaviorSubject<boolean>(false);
  private _moreLock = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<any[]>([]);
  private _allData = new BehaviorSubject<any[]>([]);

  // Observable data
  done: Observable<boolean> = this._done.asObservable();
  moreLock: Observable<boolean> = this._moreLock.asObservable();
  data: Observable<any> = this._data.asObservable();
  allData: Observable<any> = this._allData.asObservable();

  // Query configuration
  private _subscribedQuery: Subscription = null;
  private _previousLimit = new BehaviorSubject<number>(0);
  private _currentLimit = new BehaviorSubject<number>(0);

  constructor(private coreState: CoreState, private firebaseDb: AngularFireDatabase) {
    // Request some matches initially
    this.more();
    // Request all matches initially for sureBets calculation
    this.all();
  }

  // Paginated query of some db elements
  more(takeElems?: number) {
    if (!takeElems) {
      takeElems = 3;
    }

    this._previousLimit.next(this._currentLimit.value);
    this._currentLimit.next(this._currentLimit.value + takeElems);

    const query = this.firebaseDb.list<any>(this.dbRoot, ref => {
      return ref.limitToFirst(this._currentLimit.value);
    });

    if (this._done.value || this._moreLock.value) { return };

    // Sets More Lock to prevent other calls
    this._moreLock.next(true);
    // Synchronize App loading status with Api
    this.coreState.setIsAppLoading(true);

    // Change subscribed query and return data observable
    if (this._subscribedQuery !== null) {
      this._subscribedQuery.unsubscribe();
      this._subscribedQuery = null;
    }

    this._subscribedQuery = query.snapshotChanges().subscribe(values => {
      // update source with new values, done loading
      this._data.next(values);
      this._moreLock.next(false);
      this.coreState.setIsAppLoading(false);

      // no more values, mark done
      if (values.length <= this._previousLimit.value && !this._done.value) {
        this._done.next(true)
      }
    });
  }

  // Query for all elements
  all() {
    this.coreState.setIsAppLoading(true);
    const subscribedQuery = this.firebaseDb.list<any>(this.dbRoot).snapshotChanges().subscribe(values => {
      this.coreState.setIsAppLoading(false);
      this._allData.next(values);
    });
  }
}