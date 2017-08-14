import React, { Component } from 'react';
import PostsList from './PostsList';

class Blog extends Component {
  static requestInitialData() {
    return fetch('http://localhost:3000/api/blog')
      .then(response => response.json());
  }

  constructor(props) {
    super(props);

    const initialData = props.staticContext && props.staticContext.initialData;

    this.state = {
      posts: initialData
    };
  }

  componentDidMount() {
    if (!this.state.posts) {
      Blog.requestInitialData().then(posts => this.setState({ posts }));
    }
  }

  render() {
    const { posts } = this.state;

    return <PostsList posts={posts} />;
  }
}

export default Blog;
