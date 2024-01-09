// server.js
const express = require('express');
const app = express();
require('dotenv').config();

const clientId = process.env.WHOOP_CLIENT_ID;
const clientSecret = process.env.WHOOP_CLIENT_SECRET;