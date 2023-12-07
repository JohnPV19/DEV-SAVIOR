import axios from 'axios';
<<<<<<< HEAD

=======
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
class AuthService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
<<<<<<< HEAD
      baseURL: import.meta.env.SERVER_URL || 'http://localhost:5005'
      // We set our API's base URL so that all requests use the same base URL
    });

=======
      baseURL: import.meta.env.SERVER_URL || 'https://devhub.adaptable.app'
      // We set our API's base URL so that all requests use the same base URL
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

=======
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
  login = requestBody => {
    return this.api.post('/auth/login', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/login");
  };
<<<<<<< HEAD

=======
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
  signup = requestBody => {
    return this.api.post('/auth/signup', requestBody);
    // same as
    // return axios.post("http://localhost:5005/auth/singup");
  };
<<<<<<< HEAD

=======
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
  verify = () => {
    return this.api.get('/auth/verify');
    // same as
    // return axios.post("http://localhost:5005/auth/verify");
  };
}
<<<<<<< HEAD

// Create one instance object
const authService = new AuthService();

export default authService;
=======
// Create one instance object
const authService = new AuthService();
export default authService;
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
