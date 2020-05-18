import { IResolvers } from 'graphql-tools';
import UsersResolver from './users';
import PostsResolver from './posts';

const resolverMap: IResolvers = {
  Query: {
    ...UsersResolver.Query,
    ...PostsResolver.Query
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...PostsResolver.Mutation
  },
  Post: PostsResolver.Post,
};

export default resolverMap;
