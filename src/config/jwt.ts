import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });

export const secret = process.env.JWT_SECRET;
export const expiresIn = process.env.JWT_EXPIRESIN;
