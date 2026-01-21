import type { UpdateUserDTO } from './user.dto.js';

export class UserService {
  constructor(private userRepository: any) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    return user;
  }
  async create(email: string, password: string, name: string) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    const user = await this.userRepository.create({ email, password, name });
    return user;
  }
  async updateByEmail(email: string, data: UpdateUserDTO) {
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided to update');
    }

    return this.userRepository.updateByEmail(email, data);
  }

  async delete(email: string) {
    const user = await this.userRepository.deleteByEmail(email);
    return user;
  }
}
