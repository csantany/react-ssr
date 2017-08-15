// Dependencies
import React, { Component } from 'react';

// Components
import PostsList from './PostsList';

// Utils
import { apiFetch } from '../../../shared/utils/api';
import { getInitialData } from '../../../shared/utils/data';

class Blog extends Component {
  static requestInitialData() {
    return apiFetch('/blog');
  }

  constructor(props) {
    super(props);

    const initialData = getInitialData(props);

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
