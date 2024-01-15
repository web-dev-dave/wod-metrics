import axios from 'axios';
import config from '../whoopOAuthConfig';

const whoopApi = axios.create({
  baseURL: 'https://api.prod.whoop.com/oauth', // Update the base URL to the production WHOOP API URL
  headers: {
    'X-Api-Key': config.clientId,
    'X-Api-Secret': config.clientSecret,
    'Content-Type': 'application/json',
  },
});

export default whoopApi;
