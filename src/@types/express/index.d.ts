declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
      password: string;
      createdAt: Date;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
