import React, { useState } from "react";
import spotifyConfig from "../../data/SpotifyConfig";
import "./index.css";

const SearchBar = ({ accessToken, onSuccess, onClearSearch }) => {
  const [text, setText] = useState("");
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${spotifyConfig.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions).then((data) => data.json());

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      alert(e);
    }
  };

  const handleClear = () => {
    onClearSearch();
    setText("");
    setIsClear(true);
  };

  return (
    <div>
      <form className="form-search" onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." className="form-search__input" required value={text} onChange={handleInput} />
        <button type="submit" className="btn"></button>
      </form>

      {!isClear && (
        <button className="btn" onClick={handleClear}>
          Clear search
        </button>
      )}
    </div>
  );
};

export { SearchBar };
