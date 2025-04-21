import { fetchMusics } from "../utils/api.js";
import {
    renderGenreList,
    renderArtistList,
    renderTrackList
} from "../views/renderPlaylist.js";

let allMusics = []; // Store fetched music data

export async function initPlaylistApp() {
    try {
        // Fetch music data from API
        const rawData = await fetchMusics();
        allMusics = rawData.map(data => new Music(data));
        
        const container = document.getElementById("musicList");
        container.innerHTML = "";

        document.body.style.overflowY = "hidden";
        document.body.style.height = "100vh";

        const genreSection = document.createElement("div");
        genreSection.id = "genreSection";
        container.appendChild(genreSection);

        // Use the fetched data instead of mockMusics
        const genres = [...new Set(allMusics.map(m => m.genre))];
        renderGenreList(genres, handleGenreClick);

        if (!history.state || history.state.view !== "genres") {
            history.pushState({ view: "genres" }, "", "");
        }
    } catch (error) {
        console.error("Failed to initialize playlist app:", error);
        // You might want to render an error state here
    }
}

function handleGenreClick(selectedGenre) {
    const artists = [...new Set(
        allMusics
            .filter(m => m.genre === selectedGenre)
            .map(m => m.artist)
    )];
    renderArtistList(selectedGenre, artists, handleArtistClick);
    if (!history.state || history.state.view !== "artists" || history.state.genre !== selectedGenre) {
        history.pushState({ view: "artists", genre: selectedGenre }, "", "");
    }
}

function handleArtistClick(artist) {
    const songs = allMusics.filter(m => m.artist === artist);
    renderTrackList(songs, artist);
    history.pushState({ view: "tracks", artist }, "", "");
}

// You'll need a basic Music class if you don't have one already
class Music {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.artist = data.artist;
        this.genre = data.genre;
        this.trackUrl = data.trackUrl;
        this.coverImage = data.coverImage;
        this.releaseYear = data.releaseYear;
    }
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
            initHomePage(); // fallback
            break;
    }
});