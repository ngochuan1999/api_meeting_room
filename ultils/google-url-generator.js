/* eslint-disable camelcase */
const fs = require('fs');
const path = require('path');
const db = require('../models');
const { google } = require('googleapis');
const axios = require('axios');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'email', 'profile']; // https://www.googleapis.com/auth/userinfo.email

class GoogleUrlGenerator {
  constructor () {
    this.credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../credentials.json')));
    const { client_secret, client_id, redirect_uris } = this.credentials.web;
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  }

  authorizeUrl () {
    const authUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    return authUrl;
  }

  async getAccessToken (code) {
    const response = await this.oAuth2Client.getToken(code);
    return response.res.data.access_token;
  }

  async saveInfo (token) {
    const response = await axios({
      method: 'get',
      url: 'https://www.googleapis.com/userinfo/v2/me',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const result = db.User.create({
      name: response.data.name,
      email: response.data.email,
      access_token: token
    });
    return result;
  }
}

module.exports = GoogleUrlGenerator;
