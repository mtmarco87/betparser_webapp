import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { map, tap, debounce } from 'rxjs/operators';
import { UserSettings } from '../models/UserSettings';
import { LocalStorageService } from '../api/local-storage/local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class CoreState {
    private scrollStatus$ = new BehaviorSubject<string>(null);
    public static scrolledTop: string = 'top';
    public static scrolledBottom: string = 'bottom';
    private loadingStack$ = new BehaviorSubject<number>(0);
    private userSettings$ = new BehaviorSubject<UserSettings>(null);
    private infobarMessage$ = new BehaviorSubject<string[]>([]);
    private searchText$ = new BehaviorSubject<string>(null);

    constructor(private cache: LocalStorageService) { }

    getScrollStatus(): Observable<string> {
        return this.scrollStatus$.asObservable();
    }

    setScrollStatus(scrollStatus: string) {
        this.scrollStatus$.next(scrollStatus);
    }

    getIsAppLoading(): Observable<boolean> {
        return this.loadingStack$.pipe(map(loadingStack => {
            return loadingStack > 0;
        }));
    }

    setIsAppLoading(isLoading: boolean) {
        let loadingStack = this.loadingStack$.value;
        if (isLoading) {
            this.setInfobarMessage("Loading data...");
            loadingStack += 1;
        }
        else {
            loadingStack = loadingStack == 0 ? loadingStack : loadingStack - 1;
        }

        this.loadingStack$.next(loadingStack);
    }

    getUserSettings(): Observable<UserSettings> {
        if (this.userSettings$.value === null) {
            const cachedUserSettings = this.cache.getCachedUserSettings();
            if (cachedUserSettings === undefined || cachedUserSettings === null) {
                this.userSettings$.next(UserSettings.default);
            }
            else {
                this.userSettings$.next(cachedUserSettings);
            }
        }
        return this.userSettings$.asObservable();
    }

    setUserSettings(userSettings: UserSettings) {
        this.cache.cacheUserSettings(userSettings);
        this.userSettings$.next(userSettings);
    }

    // Producer/Consumer Infobar Messages Queue
    getInfobarMessage(): Observable<string> {
        // Observable pipe where for each new message received in the msgStack, we try to show it, and to
        // remove it after 100 ms, so that we can show the next one if any. The end situation will be always with the last message displayed
        return this.infobarMessage$.asObservable().pipe(
            map((msgStack) => {
                let msg: string = '';
                if (msgStack.length > 0) {
                    msg = msgStack[0];
                }
                return msg;
            }),
            tap((msg) => {
                let msgStack = this.infobarMessage$.value;
                if (msgStack.length > 1) {
                    setTimeout(function () {
                        if (this.infobarMessage$.value === msgStack) {
                            msgStack = msgStack.reverse();
                            msgStack.pop();
                            this.infobarMessage$.next(msgStack.reverse());
                        }
                    }.bind(this), 20);
                }
            }));
    }

    setInfobarMessage(msg: string) {
        // Here we push to the bottom of the messages stack a new message
        const msgStack = this.infobarMessage$.value.slice();
        msgStack.push(msg);
        this.infobarMessage$.next(msgStack);
    }

    getSearchText(): Observable<string> {
        return this.searchText$.asObservable().pipe(debounce(() => timer(400)));
    }

    setSearchText(searchText: string) {
        this.searchText$.next(searchText);
    }
}
