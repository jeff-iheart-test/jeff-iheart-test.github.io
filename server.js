/**
 *
 */
const
  http = require('http'),
  port = process.env.PORT || 8000;

/**
 * This calls the iHeart api and ends the passed in ServerResponse with
 * the top six artists from the response
 * @param term {string} search-input value
 * @param res {ServerResponse} to .end
 */
function getLove(term, res) {
  var opts = {
    headers: {'Accept': 'application/json'},
    hostname: 'api-3283.iheart.com',
    path: `/api/v1/catalog/searchAll?`
    + `keywords=${term}`
    + `&queryTrack=false`
    + `&queryBundle=false`
    + `&queryArtist=true`
    + `&queryStation=false`
    + `&queryFeaturedStation=false`
    + `&queryTalkShow=false`
    + `&queryTalkTheme=false`
    + `&queryKeyword=false`
    + `&countryCode=US`
  };

  http.get(opts, r => {
    var body = '', raw, artists, tops;
    r.on('data', chunk => body += chunk);
    r.on('end', () => {
      raw = JSON.parse(body);
      artists = raw.artists || [];
      tops = artists.splice(0, 6);
      res.end(JSON.stringify(tops));
    }).on('error', e => console.log(e.message));
  });
}

http.Server((req, res) => {
  var term = req.url.split('?').pop();
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  getLove(term, res);
}).listen(port, () => {
  console.log(`reporting for duty on port ${port}`);
});