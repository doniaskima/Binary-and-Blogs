import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { secret, whiteList, postWhiteList } from 'src/config/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { headers, path, route } = context.switchToRpc().getData();

    // Check if the route is in the whitelist
    if (whiteList.includes(path)) {
      return true;
    }

    const isGet = route.methods.get || route.methods.post;
    const token = headers.authorization?.split(' ')[1];

    if (token) {
      const payload = await this.verifyToken(token, secret);
      const { role } = payload;
      request.payload = payload;

      if (isGet) {
        return true;
      } else {
        if (role == 'admin') {
          return true;
        } else {
          if (postWhiteList.includes(path)) {
            return true;
          }
          throw new HttpException(
            'Unauthorized operation, please contact the administrator!',
            HttpStatus.FORBIDDEN,
          );
        }
      }
    } else {
      if (isGet) {
        return true;
      } else {
        throw new HttpException(
          'You are not logged in, please login first',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  private verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(token, secret, (error, payload) => {
        if (error) {
          throw new HttpException(
            'Authentication failed',
            HttpStatus.UNAUTHORIZED,
          );
        } else {
          resolve(payload);
        }
      });
    });
  }
}
