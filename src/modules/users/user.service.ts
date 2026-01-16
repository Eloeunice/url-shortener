export interface UserService {
  create: (email: string, password: string, name: string) => Promise<void>;
  update: (email: string, password: string, name: string) => Promise<void>;
  delete: (email: string) => Promise<void>;
}
