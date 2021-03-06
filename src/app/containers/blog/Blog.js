// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import PostsList from '../../components/blog/PostsList';

// Actions
import { fetchPosts } from './actions';

// Utils
import { isFirstRender } from '../../../shared/utils/data';

class Blog extends Component {
  static initialAction(fetchingFrom) {
    return fetchPosts(fetchingFrom);
  }

  componentDidMount() {
    if (isFirstRender(this.props.posts)) {
      this.props.dispatch(Blog.initialAction('client'));
    }
  }

  render() {
    const { posts } = this.props;

    return <PostsList posts={posts} />;
  }
}

export default connect(({ blog }) => ({
  posts: blog.posts
}), null)(Blog);
