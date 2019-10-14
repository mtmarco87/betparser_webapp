import { Match } from './Match';
import { BetsUtils } from '../utils/bets.utils';

export class MatchGroup {
    Date: string;
    children: Match[];

    constructor(Date: string, children: Match[] = []) {
        this.Date = Date;
        this.children = children;
    }

    public static createFromDb(dbMatchGroup: any): MatchGroup {
        let matchGroup: MatchGroup = null;

        const date = BetsUtils.getDateString(BetsUtils.getMatchDate(dbMatchGroup.key));
        if (date !== null) {
            const dbMatches = dbMatchGroup.payload.val();
            const children = Match.createManyFromDb(dbMatches);

            matchGroup = new MatchGroup(date, children);
        }

        return matchGroup;
    }

    public static createManyFromDb(dbMatchGroups: any[]): MatchGroup[] {
        const matchGroups: MatchGroup[] = [];

        dbMatchGroups.forEach(dbMatchGroup => {
            const matchGroup = MatchGroup.createFromDb(dbMatchGroup);
            if (matchGroup !== null) {
                matchGroups.push(matchGroup);
            }
        });

        return matchGroups;
    }
}