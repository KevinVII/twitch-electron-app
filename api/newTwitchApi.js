const axios = require('axios');

// Pass these arguments to every axios call unless overwritten in method
axios.defaults.baseURL = 'https://api.twitch.tv/helix';


var authUrl = 'https://id.twitch.tv';
var authPath = '/oauth2/authorize';
var accessTokenPath = '/oauth2/token'

var Twitch = function(opts){
  this.clientId = opts.clientId;
  this.clientSecret = opts.clientSecret;
  this.redirectUri = opts.redirectUri;
  this.scopes = opts.scopes || [];
}

Twitch.prototype.getAuth = async function (params){
  try {
    const res = await axios({
      baseURL: 'https://id.twitch.tv',
      url: 'oauth2/authorize',
      params: {
              client_id: this.clientId,
              redirectUri: this.redirectUri,
              response_type: 'token',
              scope: this.scopes.join(' ')
              },
      method: 'GET',
      json: true
    });
    // Check for response, if no response print error message;
  } catch (err) {
    console.error(err.response.data);
  }
};


Twitch.prototype.getClips = async function (params){
  try {
    const res = await axios({
      url: '/clips',
      params: params,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Client-ID': this.clientId,
      },
      json: true
    });

    // Check for response, if no response print error message;
    if(!res.data.data[0]){
      console.error({
        error: 'Bad Request',
        status: 404,
        message: 'Double check your parameters'
      })
    } else {
      return (res.data);
    }

  } catch (err) {
    console.error(err.response);
  }
};


Twitch.prototype.getVideos = async function (params){
  try {
    const res = await axios({
      url: '/videos',
      params: params,
      method: 'GET',
      json: true
    });

    // Check for response, if no response print error message;
    if(!res.data.data[0]){
      console.error({
        error: 'Bad Request',
        status: 404,
        message: 'Double check your parameters'
      })
    } else {
      return (res.data);
    }

  } catch (err) {
    console.error(err.response.data);
  }
};

module.exports = Twitch;
