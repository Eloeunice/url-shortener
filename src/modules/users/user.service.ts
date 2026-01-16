export class UserService {
  constructor(private userRepository: any) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }
  async create(email: string, password: string, name: string) {
    const user = await this.userRepository.create({ email, password, name });
    return user;
  }
  async update(email: string, password: string, name: string) {
    const user = await this.userRepository.updateByEmail(email, {
      password,
      name,
    });
    return user;
  }
  async delete(email: string) {
    const user = await this.userRepository.deleteByEmail(email);
    return user;
  }
}
