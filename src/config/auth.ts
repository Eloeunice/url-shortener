// gerar o token
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.AUTH_SECRET;
export const authConfig = {
  jwt: {
    secret,
    expiresIn: '1d',
  },
};
