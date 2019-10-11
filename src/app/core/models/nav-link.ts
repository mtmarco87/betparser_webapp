export class NavLink {

    id: number;
    name: string;
    description: string;
    link: string;
    isActive: boolean;
    className: string;

    constructor(id: number, name: string = '', description: string = '', link: string = '', isActive: boolean = false, className: string = '') {
        this.id = id;
        this.name = name;
        this.description = description;        
        this.link = link;
        this.isActive = isActive;
        this.className = className;
    }

}
