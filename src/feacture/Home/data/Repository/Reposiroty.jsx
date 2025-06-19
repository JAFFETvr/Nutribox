export class UserRepository {
  constructor(api) {
    this.api = api;
  }

  async fetchUser() {
    return await this.api.getUser();
  }
}
