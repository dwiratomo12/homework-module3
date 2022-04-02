import { useEffect, useState } from "react";
import spotifyConfig from "../../data/SpotifyConfig";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";
import "./index.css";

const Home = () => {
  const [accessToken, setAccessToken] = useState("");
  const [isAuthorize, setIsAuthorize] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [inSearch, setInSearch] = useState(false);

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.hash).get("#access_token");

    setAccessToken(accessToken);
    setIsAuthorize(accessToken !== null);
  }, []);

  useEffect(() => {
    if (!isInSearch) {
      const selectedTracks = filterSelectedTracks();

      setTracks(selectedTracks);
    }
  }, [selectedTracksUri]);

  const getSpotifyLinkAuthorize = () => {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${spotifyConfig.SPOTIFY_SCOPE}`;
    // return `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000&response_type=token`;
  };

  const filterSelectedTracks = () => {
    return tracks.filter((track) => selectedTracksUri.includes(track.uri));
  };

  const onSuccessSearch = (searchTracks) => {
    setIsInSearch(true);
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = searchTracks.filter((track) => !selectedTracksUri.includes(track.uri));

    setTracks([...selectedTracks, ...searchDistincTracks]);
  };

  const clearSearch = () => {
    const selectedTracks = filterSelectedTracks();

    setTracks(selectedTracks);
    setIsInSearch(false);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
    }
  };

  return (
    <>
      {!isAuthorize && (
        <main className="center">
          <p>Login first</p>
          <button className="btn" href={getSpotifyLinkAuthorize()}>
            Authorize
          </button>
        </main>
      )}

      {isAuthorize && (
        <main className="container" id="home">
          <SearchBar accessToken={accessToken} onSuccess={(tracks) => onSuccessSearch(tracks)} onClearSearch={clearSearch} />

          <div className="content">
            {tracks.length === 0 && <p>No tracks</p>}

            <div className="cards">
              {tracks.map((song) => (
                <Card key={song.id} imageUrl={song.album.images[0].url} title={song.name} artist={song.artists[0].name} toggleSelect={() => toggleSelect(track)} />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export { Home };
