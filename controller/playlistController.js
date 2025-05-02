import { fetchMusics } from "../utils/api.js";
import { Music } from "../models/musicModel.js";
import {
    renderGenreList,
    renderArtistList,
    renderTrackList
} from "../views/renderPlaylist.js";
import { clearContainerById, DOM_IDS } from "../utils/helpers.js";

let allMusics = [];

export async function initPlaylistApp() {
    try {
        const rawData = await fetchMusics();
        allMusics = rawData.map(data => {
            const music = new Music(data);
            music.genre = music.genre?.toLowerCase().trim(); // Normalize genre names
            return music;
        });

        clearContainerById(DOM_IDS.MUSIC_LIST);
        document.body.style.overflowY = "hidden";
        document.body.style.height = "100vh";

        const genreSection = document.createElement("div");
        genreSection.id = "genreSection";
        document.getElementById(DOM_IDS.MUSIC_LIST).appendChild(genreSection);

        const genres = [...new Set(allMusics.map(m => m.genre))];
        renderGenreList(genres, handleGenreClick);

        if (!history.state || history.state.view !== "genres") {
            history.pushState({ view: "genres" }, "", "");
        }
    } catch (error) {
        console.error("Failed to initialize playlist app:", error);
    }
}

function handleGenreClick(selectedGenre) {
    const artists = [...new Set(
        allMusics.filter(m => m.genre === selectedGenre).map(m => m.artist)
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

window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (!state) return initPlaylistApp();

    switch (state.view) {
        case "genres":
            initPlaylistApp(); break;
        case "artists":
            handleGenreClick(state.genre); break;
        case "tracks":
            handleArtistClick(state.artist); break;
        default:
            initPlaylistApp(); break;
    }
});