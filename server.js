const express = require ('express');
const go = require ('./hacking.js');
const app = express();


//get request handler
const handleGetReq = (req, res) => {
  go.getCMData(req.url)
  .then(go.createResponse)
  .then(({ status, data }) => {
    res.status(status).send(data);
  });
};

//delete request handler
const handleDeleteReq = (req, res) => {
  go.deleteCMData(req.url)
  .then(go.createResponse)
  .then(({ status, data }) => {
    res.status(status).send(data);
  });
};

//middleware for debugging;
const check = (req, res, next) => {
  console.log(req.url);
  next();
};

/*
Common User endpoint examples:
/user
/user/auth
*/
app.get('/user', check, handleGetReq);
app.get('/user/auth', check, handleGetReq);

/*
Common Artist endpoint examples:
/artist/list?limit=100&offset=0&type=0
/artist/<id value 1 to 918296+>
*/
app.get('/artist/:query', check, handleGetReq);

/*
Common Search endpoint examples:
/search/tag?target=spotify_playlist
/search/owner?limit=100&streamingType=spotify
/search/playlist?limit=10&q=s+s&streamingType=itunes
/search/artist?limit=10&q=drake
*/
app.get('/search/:query', check, handleGetReq);

/*
Common Playlist endpoint examples:
/playlist/spotify/updated?indie=false&limit=50&offset=0
/playlist/spotify/top?indie=false&limit=50&offset=0&ownerIds%5B%5D=13300
/playlist/spotify/countrySpecific?code2=us&indie=false&limit=50&offset=0
/playlist/spotify/totalNum
/playlist/itunes/top?limit=50&offset=0
/playlist/itunes/totalNum
/playlist/newMusicFriday
*/
app.get('/playlist/:streamingType/:query', check, handleGetReq);
app.get('/playlist/newMusicFriday', check, handleGetReq);

/*
Common Owner endpoint examples:
/owner/spotify/138822/playlists
/owner/totalNum
*/
app.get('/owner/:owner/:id/playlists', check, handleGetReq);
app.get('/owner/:query', check, handleGetReq);

/*
Common Charts endpoint examples:
/charts/spotify/datarange?chart_type=regional
/charts/spotify/top?code2=global&date=2018-03-22&duration=daily&since=2018-01-21&type=regional
/charts/spotify/newcomer
/charts/apple_music/datarange
/charts/apple_music/top?chart_type=top&code2=us&date=2018-03-23&genre=Any&since=2018-01-22
/charts/itunes/datarange
/charts/itunes/top?code2=us&date=2018-03-23&genre=Any&since=2018-01-22
/charts/itunes/newcomer
/charts/shazam/datarange
/charts/shazam/top?code2=us&date=2018-03-22&since=2018-01-21
*/
app.get('/charts/:owner/:query', check, handleGetReq);

//route to get app version
app.get('/getappversion', (req, res) => {
  go.getAppVersion()
  .then(go.createResponse)
  .then(({ status, data }) => {
    res.status(status).send(data);
  });
});

/*
Common Delete endpoint examples:
/user
*/
app.delete('/user', check, handleDeleteReq);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});



