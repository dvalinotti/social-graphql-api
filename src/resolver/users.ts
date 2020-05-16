import User from '../models/user';

type UserRequest = {
  username: String;
}
type AddUserArgs = {
  username: String;
  email: String;
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
    addUser: (_: void, { username, email, password }: AddUserArgs): any => {
      return new User({
        username,
        email,
        password,
      }).save();
    }
  }
}
