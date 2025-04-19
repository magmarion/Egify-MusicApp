import { mockMusics } from "../utils/mockedData.js";
import {
    renderGenreList,
    renderArtistList,
    renderTrackList
} from "../views/renderPlaylist.js";

export function initPlaylistApp() {
    const container = document.getElementById("musicList");
    container.innerHTML = "";

    const genreSection = document.createElement("div");
    genreSection.id = "genreSection";
    container.appendChild(genreSection);

    const genres = [...new Set(mockMusics.map(m => m.genre))];
    renderGenreList(genres, handleGenreClick);
}

function handleGenreClick(selectedGenre) {
    const artists = [...new Set(
        mockMusics
            .filter(m => m.genre === selectedGenre)
            .map(m => m.artist)
    )];

    renderArtistList(selectedGenre, artists, handleArtistClick);
}

function handleArtistClick(artist) {
    const songs = mockMusics.filter(m => m.artist === artist);
    renderTrackList(songs);
}
