import { QuoteType } from './QuoteType';

export class QuoteGroupType {
    Name: string;
    subTypes: string[] = [];

    // Possible Quote Group Types
    static type1X2 = new QuoteGroupType('1 X 2', [QuoteType.type1, QuoteType.typeX, QuoteType.type2]);
    static typeDoubleChance = new QuoteGroupType('Double Chance', [QuoteType.type1X, QuoteType.type2X, QuoteType.type12]);
    static typeGoalNoGoal = new QuoteGroupType('Goal/No Goal', [QuoteType.typeGoal, QuoteType.typeNoGoal]);
    static typeUO05 = new QuoteGroupType('Under/Over 0.5', [QuoteType.typeU05, QuoteType.typeO05]);
    static typeUO15 = new QuoteGroupType('Under/Over 1.5', [QuoteType.typeU15, QuoteType.typeO15]);
    static typeUO25 = new QuoteGroupType('Under/Over 2.5', [QuoteType.typeU25, QuoteType.typeO25]);
    static typeUO35 = new QuoteGroupType('Under/Over 3.5', [QuoteType.typeU35, QuoteType.typeO35]);
    static typeUO45 = new QuoteGroupType('Under/Over 4.5', [QuoteType.typeU45, QuoteType.typeO45]);

    // Default Quote Group Types
    static defaultTypes = [
        QuoteGroupType.type1X2,
        QuoteGroupType.typeDoubleChance,
        QuoteGroupType.typeGoalNoGoal,
        QuoteGroupType.typeUO05,
        QuoteGroupType.typeUO15,
        QuoteGroupType.typeUO25,
        QuoteGroupType.typeUO35,
        QuoteGroupType.typeUO45
    ];

    constructor(Name: string, subTypes: string[]) {
        this.Name = Name;
        this.subTypes = subTypes;
    }

    public static isValid(Type: QuoteGroupType) {
        if (QuoteGroupType.defaultTypes.some(defType => defType === Type)) {
            return true;
        }

        return false;
    }
}