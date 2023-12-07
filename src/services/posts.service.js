import axios from 'axios';
<<<<<<< HEAD

class PostsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
    });

=======
class PostsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || 'https://devhub.adaptable.app'
    });
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');
<<<<<<< HEAD

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
=======
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
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
  deletePosts = id => {
    return this.api.delete(`/api/posts/${_id}`);
  };
}
<<<<<<< HEAD

// Create one instance object
const postsService = new PostsService();

export default postsService;
=======
// Create one instance object
const postsService = new PostsService();
export default postsService;
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
