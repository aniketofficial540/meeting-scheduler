import { Request, Response } from 'express';
import * as userService from '../../service/user.service';
import { CreateUserDto } from '../../dto/user.dto';

//for user registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    
    //checking the payload for user registration
    if (!userData.name || !userData.email) {
       res.status(400).json({ error: 'Name and email are required' });
       return;
    }

    const newUser = await userService.createUser(userData); //creating the new user
    
    res.status(201).json({ message: 'User created successfully', user: newUser });

  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

// for getting all the users
export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};