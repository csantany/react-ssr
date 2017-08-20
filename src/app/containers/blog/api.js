// Constants
import { API } from '../../../shared/constants/api';

// Utils
import { apiFetch } from '../../../shared/utils/api';

class BlogApi {
  static getAllPosts(query = {}) {
    return apiFetch(API.BLOG.POSTS, {}, query);
  }
}

export default BlogApi;
