import axios from 'axios';
class PostsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  // POST
  createPosts = requestBody => {
    return this.api.post('/api/posts/new', requestBody);
  };
  // GET
  getAllPosts = () => {
    return this.api.get('/api/posts');
  };
  // GET
  getPosts = id => {
    return this.api.get(`/api/posts/${_id}`);
  };
  // DELETE
  deletePosts = id => {
    return this.api.delete(`/api/posts/${_id}`);
  };
}
// Create one instance object
const postsService = new PostsService();
export default postsService;