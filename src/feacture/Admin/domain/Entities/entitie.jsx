export class NavItem {
    constructor(name, icon, path = '') {
        this.name = name;
        this.icon = icon;
        this.path = path; 
    }
}
export class User {
    constructor(id, name, role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}