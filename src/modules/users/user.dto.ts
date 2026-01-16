export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
  name?: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  name: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}
