import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
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
}
