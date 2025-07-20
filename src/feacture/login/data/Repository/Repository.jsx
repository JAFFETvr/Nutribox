import { User } from "../../domian/Entities/Entitie";

export class LoginRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async login(username, password) {
        const apiResponse = await this.dataSource.login(username, password);

        if (apiResponse.access_token) {
            localStorage.setItem('authToken', apiResponse.access_token);
        }

        const user = new User({
            id: apiResponse.user.id,
            name: apiResponse.user.username, 
            email: apiResponse.user.email,
            role: apiResponse.user.role,
        });

        return user;
    }
}