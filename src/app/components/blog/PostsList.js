import React, { Component } from 'react';
import timeAgo from 'node-time-ago';
import { isFirstRender } from '../../../shared/utils/data';
import styles from './PostsList.scss';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    if (isFirstRender(posts)) {
      return null;
    }

    return (
      <div className="PostsList">
        <div className="header">
          <div className="title">
            <strong>Blog</strong>
          </div>
        </div>

        {posts && posts.map(post =>
          <div key={post.id} className="post">
            <p>
              <span className="id">{post.id}</span> {post.title}{' '}<small>(by {post.author})</small>
            </p>

            <small className="details">
              {timeAgo(post.date)}
            </small>
          </div>
        )}
      </div>
    );
  }
}

export default PostsList;
