const graphql = require('graphql');
const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    }
  })
});

module.exports = UserType;
