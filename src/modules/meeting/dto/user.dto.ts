
//payload while creating the new user
export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
}