import axios from 'axios';

const whoopApi = axios.create({
  baseURL: 'https://api.prod.whoop.com/v3.0', // Update the base URL to the production WHOOP API URL
  headers: {
    'X-Api-Key': process.env.WHOOP_CLIENT_ID,
    'X-Api-Secret': process.env.WHOOP_CLIENT_SECRET,
    'Content-Type': 'application/json',
  },
});

export default whoopApi;
