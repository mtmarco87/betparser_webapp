export class UserSettings {
    UserName: string;
    BackgroundColor: string;
    SidebarColor: string;

    static default = new UserSettings('Anonymous', 'black-content', 'red');

    constructor(UserName: string, BackgroundColor: string, SidebarColor: string) {
        this.UserName = UserName;
        this.BackgroundColor = BackgroundColor;
        this.SidebarColor = SidebarColor;
    }
}
