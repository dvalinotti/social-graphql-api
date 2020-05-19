// Authorization functions
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export const getClient = async (req): Promise<any> => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  }
}
