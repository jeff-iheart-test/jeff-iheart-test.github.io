(function() {
  'use strict';

  var timer,
    grid = document.getElementById('grid'),
    searchbar = document.getElementById('search-bar'),
    res = [ // sample-data/mock api response body
      {
        'name': 'The Weeknd',
        'description': 'Feat. August Alsina, Jeremih and more',
        'Image url': 'http://iscale.iheart.com/catalog/artist/744880?ops=fit(250,0)'
      }, {
        'name': 'Selena Gomez',
        'description': 'Feat. Ariana Grande, Demi Lovato and more',
        'Image url': 'http://iscale.iheart.com/catalog/artist/57706?ops=fit(250,0)'
      }, {
        'name': 'R. City',
        'description': 'Feat. Nelly, Iyaz, Wiz Khalifa and more',
        'Image url': 'http://iscale.iheart.com/catalog/artist/30005067?ops=fit(250,0)'
      }, {
        'name': 'Justin Bieber',
        'description': 'Feat. Shawn Mendes, One Direction and more',
        'Image url': 'http://iscale.iheart.com/catalog/artist/44368?ops=fit(250,0)'
      }, {
        'name': 'Major Lazer',
        'description': 'Feat. Iyaz, Dillon Francis & DJ Snake and more',
        'Image url': 'http://iscale.iheart.com/catalog/artist/43557?ops=fit(250,0)'
      }, {
        'name': 'Taylor Swift',
        'description': 'Feat. Meghan Trainor, Katy Perry and more',
        'Image url': 'http://iscale.iheart.com/catalog/artist/33221?ops=fit(250,0)'
      }
    ];

  res.forEach(obj => {
    var
      elem = document.createElement('div'),
      name = document.createElement('h4'),
      desc = document.createElement('small'),
      img = new Image;
    elem.className = 'artist';
    name.textContent = obj.name; // || some default
    desc.textContent = obj.description; // || some default
    img.src = obj['Image url']; // todo handle broken img

    elem.appendChild(img);
    elem.appendChild(name);
    elem.appendChild(desc);
    grid.appendChild(elem);
  });

  function searchArtists() {
    if(timer) clearTimeout(timer); // don't clobber the network
    timer = setTimeout(() => {
      var req = new XMLHttpRequest();
      // todo req.onreadystatechange = react
      req.open('POST', 'http://localhost:8000/', true);
      req.send(this.value);
    }, 300);
  }

  searchbar.addEventListener('keyup', searchArtists, false);
  searchbar.addEventListener('paste', searchArtists, false);

}());