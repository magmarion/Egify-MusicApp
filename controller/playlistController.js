import { mockMusics } from "../utils/mockedData.js";
import {
    renderGenreList,
    renderArtistList,
    renderTrackList
} from "../views/renderPlaylist.js";

export function initPlaylistApp() {
    const container = document.getElementById("musicList");
    container.innerHTML = "";

    document.body.style.overflowY = "hidden";
    document.body.style.height = "100vh";

    const genreSection = document.createElement("div");
    genreSection.id = "genreSection";
    container.appendChild(genreSection);

    const genres = [...new Set(mockMusics.map(m => m.genre))];
    renderGenreList(genres, handleGenreClick);

    if (!history.state || history.state.view !== "genres") {
        history.pushState({ view: "genres" }, "", "");
    }
}

function handleGenreClick(selectedGenre) {
    const artists = [...new Set(
        mockMusics
            .filter(m => m.genre === selectedGenre)
            .map(m => m.artist)
    )];
    renderArtistList(selectedGenre, artists, handleArtistClick);
    if (!history.state || history.state.view !== "artists" || history.state.genre !== selectedGenre) {
        history.pushState({ view: "artists", genre: selectedGenre }, "", "");
    }
}

function handleArtistClick(artist) {
    const songs = mockMusics.filter(m => m.artist === artist);
    renderTrackList(songs, artist);
    history.pushState({ view: "tracks", artist }, "", "");
}

window.addEventListener("popstate", (event) => {
    const state = event.state;

    if (!state) {
        initHomePage();
        return;
    }

    switch (state.view) {
        case "genres":
            initPlaylistApp();
            break;
        case "artists":
            handleGenreClick(state.genre);
            break;
        case "tracks":
            handleArtistClick(state.artist);
            break;
        default:
            initHomePage(); // fallback igen
            break;
    }
});


