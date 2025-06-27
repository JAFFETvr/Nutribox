
export class LoginUseCase {
    constructor(loginRepository) {
        this.repository = loginRepository;
    }

    async execute(phone, password) {
     
        return await this.repository.login(phone, password);
    }
}