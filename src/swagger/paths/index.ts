import { authPaths } from './auth.path';
import { mailPaths } from './mail.path';
import { uploadPaths } from './upload.path';
import { userPaths } from './user.path';

export const paths = {
  ...authPaths,
  ...userPaths,
  ...uploadPaths,
  ...mailPaths
};
