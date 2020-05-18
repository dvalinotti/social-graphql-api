import Post from '../models/post';
import User from '../models/user';

type PostRequest = {
  _id: String;
}
type PostsByAuthorRequest = {
  author: String;
}
type AddPostArgs = {
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
    addPost: (_: void, { author, title, body }: AddPostArgs): any => {
      return new Post({
        author,
        title,
        body,
        createdAt: new Date().toISOString()
      }).save();
    }
  },
  Post: {
    author: post => User.findOne({ username: post.author }),
  }
};
