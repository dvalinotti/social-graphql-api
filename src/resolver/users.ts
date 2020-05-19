import { AuthenticationError, UserInputError } from 'apollo-server';

import bcrypt from 'bcrypt';
import User from '../models/user';
import * as SessionResolver from './sessions';

type UserRequest = {
  username: String;
}
type AddUserArgs = {
  username: String;
  email: String;
  password: String;
}
type LoginArgs = {
  username: String;
  password: String;
}

export default {
  Query: {
    user: (_: void, args: UserRequest): any => {
      return User.findOne({ username: args.username }, (err, res) => {
        if (err) console.error(err);
        else return res;
      })
    },
    users(_: void): any {
      return User.find({}, (err, res): any => {
        if (err) console.error(err);
        else return res;
      });
    },
  },
  Mutation: {
    addUser: async (_: void, { username, email, password }: AddUserArgs): Promise<any> => {
      const passHash = await bcrypt.hash(password, 10);
      console.log(typeof passHash);
      return new User({
        username,
        email,
        password: passHash,
      }).save();
    },
    login: async (_:void, { username, password }: LoginArgs): Promise<any> => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError('User with this username does not exist.');
      }

      const hashedPass = await bcrypt.hash(password, 10);
      const passwordValid = await bcrypt.compare(user.get('password'), password);
      if (!passwordValid) {
        throw new AuthenticationError('Username/password combination does not match.');
      }

      return await SessionResolver.default.Mutation.createSession(
        null, 
        { userId: user.get('userId')}, 
        process.env.JWT_SECRET
      );
    }
  }
}
