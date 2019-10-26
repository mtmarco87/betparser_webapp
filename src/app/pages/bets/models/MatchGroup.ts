import { Match } from './Match';
import { from } from 'rxjs';
import { mergeMap, groupBy, reduce, map } from 'rxjs/operators';


export class MatchGroup {
    Date: string;
    children: Match[];

    constructor(Date: string, children: Match[] = []) {
        this.Date = Date;
        this.children = children;
    }

    public static createManyFromDb(dbMatchesWithDate: any[]): MatchGroup[] {
        const matchGroups: MatchGroup[] = [];

        // Extract match first
        const matches = Match.createManyFromDb(dbMatchesWithDate);

        // Then group by StartDate and create MatchGroups
        from(matches).pipe(
            groupBy(match => match.StartDate),
            mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))),
            map(arr => new MatchGroup(arr[0] as string, arr.slice(1) as Match[]))
        ).forEach(
            (matchGroup) => matchGroups.push(matchGroup)
        );
        
        return matchGroups;
    }
}