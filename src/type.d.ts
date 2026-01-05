import { JwtPayload } from '@/libs/auth';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
