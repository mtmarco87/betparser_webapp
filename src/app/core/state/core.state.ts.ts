import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
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
    private infobarStatus$ = new BehaviorSubject<string[]>([]);

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
            this.setInfobarStatus("Loading data...", CoreState.tmpMsg);
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

    getInfobarStatus(): Observable<string> {
        return this.infobarStatus$.asObservable().pipe(map((msgStack) => {
            let output: string = '';
            if (msgStack.length > 0) {
                output = msgStack[msgStack.length - 1];
            }
            return output;
        }),
            tap((msg) => {
                this.infobarStatus$.value.pop();
            }));
    }

    setInfobarStatus(msg: string) {
        const msgStack = this.infobarStatus$.value;
        msgStack.push(msg);
        this.infobarStatus$.next(msgStack);
    }
}
