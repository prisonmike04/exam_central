import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;  // Changed to `string` to match the global declaration
        role: string;
      };
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;  // Consistent with the global definition
      role: string;
    };
  }
}
