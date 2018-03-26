/*
    Created By Warren 3/20/18
*/


/********************************************************************************************

------------------------------------- INSTRUCTIONS -------------------------------------------

1. Understand HTTP requests first and how RESTful API works.
2. Use developer tool to check network (requestts) between Chartmetric.io (App) and server

    Email: interviewee@chartmetric.io
    Password: ilovehacking

3. Hack data and to see if APIs has any loopholes
4. Try to find vulnerabilities of the site
5. Code everything below using JS and please write down any comments
6. Set up a simple nodeJS server and serve hacked data (GET/POST/PUT..)
7. Deployed the server using some 3rd paty services

<Scenar`io>
Now you are being a hacker and try to use this free account to hack
Chartmetric.io and to steal preminum access data.
And you are planing to build your own server to serve these data

Happy Hacking !!!!

********************************************************************************************/

const rp = require('request-promise');
const BEARER_TOKEN = process.env.BEARER_TOKEN || '';

//Method to get the app version
const getAppVersion = () =>
rp('https://chartmetric.io/appVersion')
.then(cmResp => cmResp)
.catch(err => err);

//Method to generate http request parameters
const generateReqOptions = (path = '', method = 'GET', body = '') => {
  return {
    uri: `https://api.chartmetric.io${path}`,
    method,
    body,
    headers: {'Authorization': BEARER_TOKEN }
  }
};

//Method to check if a response is an error
const isError = (resp) => {
  return resp.name === 'StatusCodeError' ? true : false;
};

//Method to return status code and formatted data based on CM's server response
const createResponse = cmResp => {
  if (isError(cmResp))
    return {
      status: cmResp.statusCode,
      data: JSON.parse(cmResp.error)
    };

  return {
    status: 200,
    data: JSON.parse(cmResp),
  }
};

//Method to send GET request to CM and returns a promise with the results
const getCMData = (endpoint) => {
  const options = generateReqOptions(endpoint, 'GET');

  return rp(options)
  .then(cmResp => cmResp)
  .catch(err => err);
};

//Method to send DELETE request to CM and returns a promise with the results
const deleteCMData = (endpoint) => {
  const options = generateReqOptions(endpoint, 'DELETE');

  return rp(options)
  .then(cmResp => cmResp)
  .catch(err => err);
};

module.exports = {
    getAppVersion,
    createResponse,
    getCMData,
    deleteCMData,
};
