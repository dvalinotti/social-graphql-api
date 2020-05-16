import Post from '../models/post';

type PostRequest = {
  _id: String;
}
type PostsByAuthorRequest = {
  author: String;
}
type AddUserArgs = {
  author: String;
  title: String;
  body: String;
}

export default {
  Query: {
    post: (_: void, { _id }: PostRequest): any => {
      return Post.findOne({ _id });
    },
    postsByAuthor: (_: void, { author }: PostsByAuthorRequest): any => {
      return Post.find({ author });
    },
    posts: (_: void): any => {
      return Post.find({});
    },
  },
  Mutation: {
    addPost: (_: void, { author, title, body }: AddUserArgs): any => {
      return new Post({
        author,
        title,
        body
      }).save();
    }
  }
};
