const graphql = require('graphql');
const { 
  GraphQLSchema, 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLNonNull
} = graphql;

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    _id: {
      type: GraphQLString,
    },
    author: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    }
  })
});

module.exports = PostType;
