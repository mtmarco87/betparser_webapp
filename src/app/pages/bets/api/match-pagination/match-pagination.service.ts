import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CoreState } from 'app/core/state/core.state';
import { MatchFilter } from 'app/pages/bets/models/MatchFilter';
import { MatchGroup } from '../../models/MatchGroup';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MatchPaginationService {

  private readonly dbRoot: string = "/parsed_bets";

  // Source data
  private _done = new BehaviorSubject<boolean>(false);
  private _loading = new BehaviorSubject<boolean>(false);
  private _data = new BehaviorSubject<MatchGroup[]>([]);
  private _allData = new BehaviorSubject<MatchGroup[]>([]);
  private _allDataCount = new BehaviorSubject<number>(0);
  private _initialized = new BehaviorSubject<boolean>(false);

  // Observable data
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  data: Observable<MatchGroup[]> = this._data.asObservable();
  allData: Observable<MatchGroup[]> = this._allData.asObservable();
  allDataCount: Observable<number> = this._allDataCount.asObservable();

  // Pagination Filter configuration
  private _subscribedQuery: Subscription = null;
  private _increment: number = 3;
  private _filter: MatchFilter = null;

  constructor(private coreState: CoreState, private firebaseDb: AngularFireDatabase) {
    // Subscription to retrieve all DB Data with Real time updates
    this.initializeAll();

    // Subscription to retrieve paginated DB Data 
    // (this subscription will change, taking more elements, with scroll down or search filter change)
    this.more(new MatchFilter());
  }

  // Retrieves all data from DB and transforms it into MatchGroup objects
  initializeAll() {
    this.coreState.setIsAppLoading(true);
    this.firebaseDb.list(this.dbRoot).snapshotChanges().pipe(
      map(dbMatchesWithDate => {
        // Here is set the total count of Matches (because they are flattened in the DB before processing)
        this._allDataCount.next(dbMatchesWithDate.length);
        return MatchGroup.createManyFromDb(dbMatchesWithDate);
      })).subscribe(allMatchGroups => {
        this.coreState.setIsAppLoading(false);
        // Here is set the array with the whole db data
        this._allData.next(allMatchGroups);
        this._initialized.next(true);
      });
  }

  // Paginated query of some db elements
  more(filter?: MatchFilter) {
    if (filter) {
      this._filter = filter;
      this._done.next(false);
    }
    else if (this._filter) {
      filter = this._filter;
    }
    else {
      return;
    }

    if (filter.Paginated) {
      filter.TakeElems = filter.TakeElems ? filter.TakeElems + this._increment : this._increment;
    }

    if (this._done.value || this._loading.value) {
      return
    };

    this._loading.next(true);
    this.coreState.setIsAppLoading(true);

    // Change subscribed query (and consequently returned observable)
    if (this._subscribedQuery !== null) {
      this._subscribedQuery.unsubscribe();
      this._subscribedQuery = null;
    }

    this._subscribedQuery = this.allData.subscribe(matchGroups => {
      // update data observable with new filtered values, set done loading
      const filteredMatchGroups = filter.applyFilter(matchGroups);
      this._data.next(filteredMatchGroups);
      this._loading.next(false);
      this.coreState.setIsAppLoading(false);

      if (!this._initialized.value) {
        return;
      }

      // no more values, mark done
      if (!filter.Paginated || (filter.TakeElems >= this._allDataCount.value && !this._done.value)) {
        this._done.next(true)
      }
    });
  }
}