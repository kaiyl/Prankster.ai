//


declare module './components/Form/Form' {
    import { FC } from 'react';
    
    export interface FormProps {
      addPost: (post: any) => void;
    }
    
    const Form: FC<FormProps>;
    export default Form;
  }
  
  declare module './components/Posts/Posts' {
    import { FC } from 'react';
    
    export interface PostsProps {
      posts: any[];
    }
    
    const Posts: FC<PostsProps>;
    export default Posts;
  }
  
  declare module './components/Posts/Post/Post' {
    import { FC } from 'react';
    
    export interface PostProps {
      post: any;
    }
    
    const Post: FC<PostProps>;
    export default Post;
  }
  