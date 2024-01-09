import axios from 'axios';
import whoopApi from '../api/whoopApi';

const whoopAuth = {
  getAuthorizationUrl: () => {
    // Step 1: Redirect user to WHOOP authorization endpoint
    const authorizationUrl = 'https://api.prod.whoop.com/oauth/oauth2/auth';

    const redirectUri = encodeURIComponent('https://whoop.com/muckaround/test');
    return `${authorizationUrl}?client_id=${process.env.WHOOP_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=desired_scopes`;
  },

  exchangeCodeForToken: async (authorizationCode) => {
    // Step 3: Exchange authorization code for access token
    try {
      const tokenUrl = `${whoopApi.defaults.baseURL}/oauth2/token`;
      const tokenParams = {
        client_id: whoopApi.defaults.headers.common['X-Api-Key'],
        client_secret: whoopApi.defaults.headers.common['X-Api-Secret'],
        redirect_uri: 'https://whoop.com/muckaround/test',
        code: authorizationCode,
        grant_type: 'authorization_code',
      };

      const response = await axios.post(tokenUrl, null, { params: tokenParams });
      return response.data.access_token;
    } catch (error) {
      throw new Error(`Error exchanging authorization code for access token: ${error.message}`);
    }
  },

  makeAuthorizedRequest: async (accessToken, endpoint) => {
    // Step 4: Use the access token to make authorized requests to the WHOOP API
    try {
      const apiEndpoint = `${whoopApi.defaults.baseURL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = await axios.get(apiEndpoint, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error making API request: ${error.message}`);
    }
  },
};

export default whoopAuth;
