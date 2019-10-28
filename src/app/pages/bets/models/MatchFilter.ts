import { BetsUtils } from '../utils/bets.utils';
import { MatchGroup } from './MatchGroup';
import * as moment from 'moment';

export class MatchFilter {
    Paginated: boolean;
    TakeElems: number; // null => everything
    FromDate: moment.Moment; // moment() => Today
    All: string[];
    Name: string[];
    Team1: string[];
    Team2: string[];
    StartDate: string[];
    Bookmaker: string[];

    constructor(Paginated: boolean = true, TakeElems: number = null, FromDate: moment.Moment = moment(), All: string[] = null,
        Name: string[] = null, Team1: string[] = null, Team2: string[] = null, StartDate: string[] = null, Bookmaker: string[] = null) {
        this.Paginated = Paginated;
        this.TakeElems = TakeElems;
        this.FromDate = FromDate;
        this.All = All;
        this.Name = Name;
        this.Team1 = Team1;
        this.Team2 = Team2;
        this.StartDate = StartDate;
        this.Bookmaker = Bookmaker;
    }

    applyFilter(matchGroups: MatchGroup[]): MatchGroup[] {
        const filteredMatchGroups: MatchGroup[] = [];

        let takenMatches = 0;
        matchGroups.forEach(matchGroup => {
            if (this.TakeElems && takenMatches === this.TakeElems) {
                return;
            }
            const filteredMatchGroup = new MatchGroup(matchGroup.Date);
            matchGroup.children.forEach(match => {
                if (this.TakeElems && takenMatches === this.TakeElems) {
                    return;
                }

                let valid: boolean;
                if (this.FromDate && !BetsUtils.parseMatchDate(match.StartDate, BetsUtils.AppDateFormat).isSameOrAfter(this.FromDate, "day")) {
                    return;
                }

                if (this.hasFilter()) {
                    if (this.All) {
                        valid = true;
                        this.All.forEach(searchTxt => {
                            searchTxt = searchTxt.toLowerCase().trim();
                            valid = valid
                                && ((match.Name.toLowerCase().includes(searchTxt)) ||
                                    (match.Team1.toLowerCase().includes(searchTxt)) ||
                                    (match.Team2.toLowerCase().includes(searchTxt)) ||
                                    (match.StartDate.toLowerCase().includes(searchTxt)) ||
                                    (match.children.some(bm => {
                                        return bm.Bookmaker.toLowerCase().includes(searchTxt) && bm.hasQuotesAvailable();
                                    })));

                        });
                    }
                    else if (this.Name) {
                        valid = false;
                        this.Name.forEach(name => {
                            name = name.toLowerCase().trim();
                            valid = valid || (match.Name.toLowerCase().includes(name));
                        });
                    }
                    else {
                        valid = false;
                    }
                }
                else {
                    valid = true;
                }

                if (valid) {
                    takenMatches++;
                    filteredMatchGroup.children.push(match);
                }
            });

            if (filteredMatchGroup.children.length > 0) {
                filteredMatchGroups.push(filteredMatchGroup);
            }
        });

        return filteredMatchGroups;
    }

    private hasFilter() {
        return this.All || this.Bookmaker || this.StartDate || this.Name || this.Team1 || this.Team2;
    }
}
