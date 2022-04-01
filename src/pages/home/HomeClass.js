import React, { Component } from "react";
import spotifyConfig from "../../data/SpotifyConfig";
import SearchBar from "../../components/SearchBarClass";
import Card from "../../components/Card";
import "../../style/Home.css";

class Home extends Component {
  state = {
    accessToken: "",
    isAuthorize: false,
    tracks: [],
  };

  getHashParams = () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);

    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }

    return hashParams;
  };

  componentDidMount() {
    const params = this.getHashParams();
    const { access_token: accessToken } = params;

    this.setState({ accessToken, isAuthorize: accessToken !== undefined });
  }

  getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${spotifyConfig.SPOTIFY_SCOPE}`;
  };

  onSuccessSearch = (tracks) => {
    this.setState({ tracks });
  };

  render() {
    return (
      <>
        {!this.state.isAuthorize && (
          <main className="center">
            <p>Login first</p>
            <button className="btn" href={this.getSpotifyLinkAuthorize()}>
              Authorize
            </button>
          </main>
        )}

        {this.state.isAuthorize && (
          <main className="container" id="home">
            <SearchBar accessToken={this.state.accessToken} onSuccess={(tracks) => this.onSuccessSearch(tracks)} />

            <div className="content">
              {this.state.tracks.length === 0 && <p>No tracks</p>}

              <div className="cards">
                {this.state.tracks.map((song) => (
                  <Card key={song.id} imageUrl={song.album.images[0].url} title={song.name} artist={song.artists[0].name} />
                ))}
              </div>
            </div>
          </main>
        )}
      </>
    );
  }
}

export default Home;
