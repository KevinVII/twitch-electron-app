const axios = require('axios');
// const config = require('config');

// Pass these arguments to every axios call unless overwritten in method
axios.defaults.baseURL = 'https://api.twitch.tv/helix';
axios.defaults.headers = {
  'Accept': 'application/json',
//  'Client-ID': config.get('clientId')
};

var authUrl = 'https://id.twitch.tv';
var authPath = '/oauth2/authorize';
var accessTokenPath = '/oauth2/token'

var Twitch = function(opts){
  this.clientId = opts.clientId;
  this.clientSecret = opts.clientSecret;
  this.redirectUri = opts.redirectUri;
  this.scopes = opts.scopes || [];
}


Twitch.prototype.Method = async function (params){


};


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

//   _   _          ___        _   _
//  | \ | |        / _ \      | | | |
//  |  \| | ___   / /_\ \_   _| |_| |__
//  | . ` |/ _ \  |  _  | | | | __| '_ \
//  | |\  | (_) | | | | | |_| | |_| | | |
//  \_| \_/\___/  \_| |_/\__,_|\__|_| |_|
//

Twitch.prototype.getTopGames = async function (params){
  try {
    const res = await axios({
      url: '/games/top',
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

Twitch.prototype.getGames = async function (params){
  try {
    const res = await axios({
      url: '/games',
      params: params,
      method: 'GET',
      headers: {
        'Client-ID': this.clientID
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

Twitch.prototype.getClips = async function (params){
  try {
    const res = await axios({
      url: '/clips',
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

Twitch.prototype.getStreams = async function (params){
  try {
    const res = await axios({
      url: '/streams',
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
      return(res.data)
    }

  } catch (err) {
    console.error(err.response.data);
  }
};

Twitch.prototype.getStreamsMetaData = async function (params){
  try {
    const res = await axios({
      url: '/streams/metadata',
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
      return(res.data)
    }

  } catch (err) {
    console.error(err.response.data);
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

Twitch.prototype.getUser = async function (params){
  try {
    const res = await axios({
      url: '/users',
      params: params,
      method: 'GET',
      headers: {
        'Client-ID': this.clientId
      },
      json: true
    });

    console.log('this is the function ' + this.clientId)
    // Check for response, if no response print error message;
    if(!res.data.data[0]){
      console.error({
        error: 'Bad Request',
        status: 404,
        message: 'Double check your parameters'
      })
    } else {
      return (res.data.data[0]);
    }

  } catch (err) {
    console.error(err.response);
  }
};

Twitch.prototype.getUsersFollows = async function (params){
  try {
    const res = await axios({
      url: '/users/follows',
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


//    ___        _   _      ______                 _              _
//   / _ \      | | | |     | ___ \               (_)            | |
//  / /_\ \_   _| |_| |__   | |_/ /___  __ _ _   _ _ _ __ ___  __| |
//  |  _  | | | | __| '_ \  |    // _ \/ _` | | | | | '__/ _ \/ _` |
//  | | | | |_| | |_| | | | | |\ \  __/ (_| | |_| | | | |  __/ (_| |
//  \_| |_/\__,_|\__|_| |_| \_| \_\___|\__, |\__,_|_|_|  \___|\__,_|
//                                        | |
//                                        |_|

Twitch.prototype.createClip = async function (params){
  try {
    const res = await axios({
      url: '/clips',
      params: params,
      method: 'GET',
      json: true
    });

    // Check for response, if no response print error message;
    if(!res.data.data[0]){
      console.error({
        error: 'Bad Request',
        status: 404,
        message: 'Double check your parameters',
        headers: {
          'Authorization': 'Bearer '
        }
      })
    } else {
      return (res.data);
    }

  } catch (err) {
    console.error(err.response.data);
  }
};
module.exports = Twitch;
