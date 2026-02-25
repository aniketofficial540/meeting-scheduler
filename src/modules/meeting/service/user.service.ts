import User from '../module/user.model';
import { CreateUserDto } from '../dto/user.dto';

export const createUser = async (userData: CreateUserDto) => {
  
  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password
  });
  
  
  return newUser;
};

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['password'] } //password will not be shown
  });
};