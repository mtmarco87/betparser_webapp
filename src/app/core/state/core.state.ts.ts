import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class CoreState {
    private scrollStatus$ = new BehaviorSubject<string>(null);
    public static scrolledTop: string = 'top';
    public static scrolledBottom: string = 'bottom';
    private loadingStack$ = new BehaviorSubject<number>(0);

    getScrollStatus(): Observable<string> {
        return this.scrollStatus$.asObservable();
    }

    setScrollStatus(scrollStatus: string) {
        this.scrollStatus$.next(scrollStatus);
    }

    getIsAppLoading() {
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
}
