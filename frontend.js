(function() {
  'use strict';

  var timer,
    nodeUrl = 'https://jeff-iheart-test.herokuapp.com',
    defaults = [
      {
        'name': 'The Weeknd',
        'description': 'Feat. August Alsina, Jeremih and more',
        'Image url': 'https://iscale.iheart.com/catalog/artist/744880?ops=fit(250,0)'
      }, {
        'name': 'Selena Gomez',
        'description': 'Feat. Ariana Grande, Demi Lovato and more',
        'Image url': 'https://iscale.iheart.com/catalog/artist/57706?ops=fit(250,0)'
      }, {
        'name': 'R. City',
        'description': 'Feat. Nelly, Iyaz, Wiz Khalifa and more',
        'Image url': 'https://iscale.iheart.com/catalog/artist/30005067?ops=fit(250,0)'
      }, {
        'name': 'Justin Bieber',
        'description': 'Feat. Shawn Mendes, One Direction and more',
        'Image url': 'https://iscale.iheart.com/catalog/artist/44368?ops=fit(250,0)'
      }, {
        'name': 'Major Lazer',
        'description': 'Feat. Iyaz, Dillon Francis & DJ Snake and more',
        'Image url': 'https://iscale.iheart.com/catalog/artist/43557?ops=fit(250,0)'
      }, {
        'name': 'Taylor Swift',
        'description': 'Feat. Meghan Trainor, Katy Perry and more',
        'Image url': 'https://iscale.iheart.com/catalog/artist/33221?ops=fit(250,0)'
      }
    ];

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.fetchArtists = this.fetchArtists.bind(this);
      this.updateGrid = this.updateGrid.bind(this);
      this.state = {dataset: defaults};
    }

    render() {
      return (
        <div>
          <span className="search-input">
            <i className="magnifying-glass"></i>
            <input onChange={this.updateGrid}/>
          </span>
          <Grid dataset={this.state.dataset}/>
        </div>
      );
    }

    updateGrid(e) {
      var val = encodeURI(e.target.value);
      if(timer) clearTimeout(timer); // still typing, don't clobber the network
      if(val) { // something to search for - plan to call node service
        timer = setTimeout(() => this.fetchArtists(val), 300);
      } else {  // empty search-bar, put defaults back
        this.setState({dataset: defaults});
      }
    }

    fetchArtists(term) {
      var req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        if(req.readyState === 4 && req.status === 200)
          this.setState({
            dataset: JSON.parse(req.response).map(artist => ({
              "name": artist.artistName,
              "Image url": `https://iscale.iheart.com/catalog/artist/${artist.artistId}?ops=fit(250,0)`
            }))
          });
      };
      req.open('GET', `${nodeUrl}/iheart?${term}`, true);
      req.send();
    }
  }

  class Grid extends React.Component {
    render() {
      return (
        <div id="grid">
          {this.props.dataset.map(artist => (
            <div className="artist" key={artist.name}>
              <img src={artist['Image url']}/>
              <h4>{artist.name}</h4>
              <small>{artist.description}</small>
            </div>
          ))}
        </div>
      );
    }
  }

  ReactDOM.render(<App/>, document.getElementById('app'));
}());
