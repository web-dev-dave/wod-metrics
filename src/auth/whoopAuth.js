import axios from "axios";
import whoopApi from "../api/whoopApi";
import config from "../whoopOAuthConfig";

const whoopAuth = {
  getAuthorizationUrl: () => {
    // Function to generate a random string
    const generateRandomString = (length) => {
      const charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
      }
      return result;
    };

    // Generate a random string for the state parameter
    const state = generateRandomString(9);

    const scopeValues = config.scope.map(value => encodeURIComponent(value)).join('%20');

    const redirectUri = encodeURIComponent(config.callbackURL);
    return `${config.authorizationURL}?client_id=${config.clientID}&redirect_uri=${redirectUri}&response_type=code&scope=${scopeValues}&state=${state}`;
  },

  exchangeCodeForToken: async (authorizationCode) => {
    // Step 3: Exchange authorization code for access token
    try {
      const tokenUrl = config.tokenURL;
      const tokenParams = {
        client_id: whoopApi.defaults.headers.common["X-Api-Key"],
        client_secret: whoopApi.defaults.headers.common["X-Api-Secret"],
        redirect_uri: config.redirectUri,
        code: authorizationCode,
        grant_type: "authorization_code",
      };

      const response = await axios.post(tokenUrl, null, {
        params: tokenParams,
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error(
        `Error exchanging authorization code for access token: ${error.message}`,
      );
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
