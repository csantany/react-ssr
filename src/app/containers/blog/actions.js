// Api
import blogApi from './api';

// Action Types
import { FETCH_POSTS } from './actionTypes';

export const fetchPosts = query => dispatch => {
  const requestPosts = () => ({
    type: FETCH_POSTS.request()
  });

  const receivedPosts = posts => ({
    type: FETCH_POSTS.success(),
    payload: posts
  });

  const errorPosts = error => ({
    error,
    type: FETCH_POSTS.error()
  });

  if (query && !query.language) {
    query.language = 'en';
  }

  dispatch(requestPosts());

  return blogApi.getAllPosts(query)
    .then(posts => dispatch(receivedPosts(posts)))
    .catch(error => dispatch(errorPosts(error)));
};
