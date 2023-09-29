import * as jwt from 'jsonwebtoken';
import { secret as key } from 'src/config/jwt';

export function verifyToken(token, secret: string = key): Promise<any> {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        resolve({ userId: -1 });
      } else {
        resolve(payload);
      }
    });
  });
}
