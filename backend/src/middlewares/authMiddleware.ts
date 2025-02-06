import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedUser extends JwtPayload {
  id: number;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is missing or invalid
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authorization token missing or invalid' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token with the secret key
    const secretKey = process.env.JWT_SECRET || 'secret';
    const decoded = jwt.verify(token, secretKey) as DecodedUser;

    // Attach the decoded user data to the request object
    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ success: false, message: 'Invalid or expired authorization token' });
  }
};
