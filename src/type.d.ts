import { JwtPayload } from '@/libs/auth';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    validatedQuery?: any;
    validatedParams?: any;
    validatedBody?: any;
  }
}
