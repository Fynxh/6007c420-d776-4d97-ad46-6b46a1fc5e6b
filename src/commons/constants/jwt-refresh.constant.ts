import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE;
