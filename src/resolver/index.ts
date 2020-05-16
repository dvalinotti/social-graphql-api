import { IResolvers } from 'graphql-tools';
import UsersResolver from './users';
import PostsResolver from './posts';

type UserResponse = {
  user: {
    _id: String,
    username: String,
    password: String,
    email: String,
  }
}
type UserRequest = {
  username: String,
}

const resolverMap: IResolvers = {
  Query: {
    hello(_: void, args: void): string {
      return 'Hello world! 👋🏻';
    },
    ...UsersResolver.Query,
    ...PostsResolver.Query
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...PostsResolver.Mutation
  }
};

export default resolverMap;
