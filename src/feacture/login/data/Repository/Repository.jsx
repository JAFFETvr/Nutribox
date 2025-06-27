import { User } from "../../domian/Entities/Entitie";

export class LoginRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async login(phone, password) {
        const rawUserData = await this.dataSource.login(phone, password);
      
        const user = new User({
            id: rawUserData.userId,
            name: rawUserData.fullName,
            email: rawUserData.emailAddress,
            phone: rawUserData.phoneNumber,
        });

      

        return user;
    }
}