/**
 *
 */
const http = require('http');

/**
 *
 * @param term {string} search-input value
 * @param res {ServerResponse}
 */
function getLove(term, res) {
  var url = `http://api-3283.iheart.com/api/v1/catalog/searchAll?`
    + `keywords=${term}`
    + `&queryTrack=false`
    + `&queryBundle=false`
    + `&queryArtist=true`
    + `&queryStation=false`
    + `&queryFeaturedStation=false`
    + `&queryTalkShow=false`
    + `&queryTalkTheme=false`
    + `&queryKeyword=false`
    + `&countryCode=US`;

  http.get(url, r => {
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
  var body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    getLove(body, res);
  });
}).listen(process.env.PORT || 8000);