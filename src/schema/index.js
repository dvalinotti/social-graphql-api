const graphql = require('graphql');
const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLList, 
  GraphQLNonNull 
} = graphql;

const User = require('../models/user');
const UserType = require('./user');

const Post = require('../models/post');
const PostType = require('./post');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        username: { type: GraphQLString }
      },
      resolve: ({ username }) => {
        return User.findOne({ username });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => User.find({}),
    },
    post: {
      type: PostType,
      args: {
        author: { type: GraphQLString },
      },
      resolve: ({ author }) => {
        return Post.findOne({ author });
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => Post.find({}),
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'UserMutation',
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve: (parent,{ username, email, password}) => {
        return new User({
          username,
          email,
          password
        }).save();
      }
    },
    addPost: {
      type: PostType,
      args: {
        author: {
          type: new GraphQLNonNull(GraphQLString),
        },
        title: {
          type: new GraphQLNonNull(GraphQLString),
        },
        body: {
          type: new GraphQLNonNull(GraphQLString),
        }
      },
      resolve: (parent, { author, title, body }) => {
        return new Post({
          author,
          title,
          body,
        }).save();
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
