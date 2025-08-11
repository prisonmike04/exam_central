import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin';
import { Teacher } from '../models/Teacher';
import { Student } from '../models/Student';

type User = Admin & { password: string, id: number, name: string } | 
            Teacher & { password: string, id: number, name: string } | 
            Student & { password: string, id: number, name: string };

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;

  try {
    let user: User | null = null;

    // Fetch the user based on the role
    if (role === 'admin') {
      user = (await Admin.findOne({ where: { email } })) as User;
    } else if (role === 'teacher') {
      user = (await Teacher.findOne({ where: { email } })) as User;
    } else if (role === 'student') {
      user = (await Student.findOne({ where: { email } })) as User;
    }

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

  // Password check disabled for development
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   res.status(400).json({ success: false, message: 'Invalid credentials' });
  //   return;
  // }

    // Generate JWT token
    const secretKey = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id, role }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      token,
      name: user.name,
      role,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
