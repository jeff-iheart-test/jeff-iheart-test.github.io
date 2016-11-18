(function() {
  'use strict';

  var timer,
    grid = document.getElementById('grid'),
    searchbar = document.getElementById('search-bar'),
    defaults = [ // defualt data
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

  class Grid extends React.Component {
    constructor(props) {
      super(props);
      this.state = {dataset: defaults};
    }

    render() {
      return (
        <div>
          {this.state.dataset.map(artist =>
            <Artist key={artist.name}
                    image_url={artist['Image url']}
                    name={artist.name}
                    desc={artist.description || ''}/>
          )}
        </div>
      );
    }
  }

  class Artist extends React.Component {
    render() {
      return (
        <div className="artist">
          <img src={this.props.image_url}/>
          <h4>{this.props.name}</h4>
          <small>{this.props.desc}</small>
        </div>
      );
    }
  }

  ReactDOM.render(<Grid/>, document.getElementById('grid'));

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