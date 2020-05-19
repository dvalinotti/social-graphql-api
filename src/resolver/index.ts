import { IResolvers } from 'graphql-tools';
import UsersResolver from './users';
import PostsResolver from './posts';
import SessionsResolver from './sessions';
import { GraphQLScalarType } from 'graphql'

const Void = new GraphQLScalarType({
    name: 'Void',

    description: 'Represents NULL values',

    serialize() {
        return null
    },

    parseValue() {
        return null
    },

    parseLiteral() {
        return null
    }
})

const resolverMap: IResolvers = {
  Query: {
    ...UsersResolver.Query,
    ...PostsResolver.Query,
    ...SessionsResolver.Query,
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...PostsResolver.Mutation,
    ...SessionsResolver.Mutation,
  },
  Post: PostsResolver.Post,
  Void,
};

export default resolverMap;
