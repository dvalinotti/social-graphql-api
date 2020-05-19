import { AuthenticationError } from 'apollo-server';
import Session from '../models/session';
import jwt from 'jsonwebtoken';

type SessionRequest = {
  token: String;
}
type SessionByUserRequest = {
  userId: String;
}
type NewSessionArgs = {
  userId: String;
}
type CreateTokenArgs = {
  userId: String;
  secret: String;
}

const createSessionToken = async ({ userId, secret }: CreateTokenArgs): Promise<String> => {
  return await jwt.sign({ userId: userId }, secret, {
    expiresIn: '24h'
  });
}

export default {
  Query: {
    session: (_: void, { token }: SessionRequest): any => {
      return Session.findOne({ token });
    },
    sessions: (_: void) => Session.find({}),
    sessionByUserId: (_: void, { userId }: SessionByUserRequest): any => {
      return Session.findOne({ userId });
    }
  },
  Mutation: {
    createSession: async (
      _: void, 
      { userId }: NewSessionArgs,
      { secret }: any
    ): Promise<any> => {
      const createdAt = new Date().toISOString();
      const existingSession = await Session.findOne({ userId });
      // Check if session exists for userId
      if (existingSession) {
        return existingSession;
      }
      // If no session exists, create new
      return new Session({
        token: await createSessionToken({userId, secret}),
        userId,
        createdAt,
      }).save();
    },
    destroySession: async (_: void, { token }: SessionRequest): Promise<any> => {
      const existingSession = await Session.findOne({ token });
      if (!existingSession) {
        return { type: 'error', message: 'No session with this token exists.' };
      }
      const deleted = (await Session.deleteOne({ token })).ok;
      console.log(deleted);

      if (deleted !== 1) {
        return { type: 'error', message: 'An unknown error occurred.' };
      }
      return { type: 'success', message: 'Successfully logged out.' };
    }
  }
}
