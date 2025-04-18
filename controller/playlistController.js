import { mockMusics } from "../utils/mockedData.js";
import { Playlist, PlaylistManager } from "../models/musicModel.js";
import {
    renderGenreList,
    renderArtistList,
    renderTrackList,
    renderUserPlaylist,
    renderPlaylistCreation
} from "../views/renderPlaylist.js";

export function initPlaylistApp() {
    const container = document.getElementById("musicList");
    container.innerHTML = "";

    const genreSection = document.createElement("div");
    genreSection.id = "genreSection";
    container.appendChild(genreSection);

    const userPlaylistSection = document.createElement("div");
    userPlaylistSection.id = "userPlaylistSection";
    container.appendChild(userPlaylistSection);

    const genres = [...new Set(mockMusics.map(m => m.genre))];
    renderGenreList(genres, handleGenreClick);

    renderUserPlaylist(PlaylistManager.getPlaylists(), {
        onDelete: handleDeletePlaylist,
        onClick: handleCustomPlaylistClick
    });

    document.getElementById("newPlaylistBtn")?.addEventListener("click", () => {
        renderPlaylistCreation({
            availableTracks: mockMusics,
            existingPlaylists: PlaylistManager.getPlaylists(),
            onCreate: (name, tracks) => {
                const newPlaylist = new Playlist(name, tracks);
                PlaylistManager.savePlaylist(newPlaylist);
                refreshPlaylists();
            }
        });
    });
}


function refreshPlaylists() {
    const genreSection = document.getElementById("genreSection");
    const userPlaylistSection = document.getElementById("userPlaylistSection");

    if (!genreSection || !userPlaylistSection) return;

    // Visa om genrer (så vi inte tappar dem)
    genreSection.innerHTML = "";
    const genres = [...new Set(mockMusics.map(m => m.genre))];
    renderGenreList(genres, handleGenreClick);

    userPlaylistSection.innerHTML = "";
    renderUserPlaylist(PlaylistManager.getPlaylists(), {
        onDelete: handleDeletePlaylist,
        onClick: handleCustomPlaylistClick
    });
}

function handleCustomPlaylistClick(playlist) {
    renderTrackList(playlist.tracks);
}

// Om användaren lagt till låt via startsidan
const urlParams = new URLSearchParams(window.location.search);
const addedTrack = urlParams.get("track");
if (addedTrack) {
    const track = JSON.parse(decodeURIComponent(addedTrack));
    const playlists = PlaylistManager.getPlaylists();
    if (!playlists.find(p => p.tracks.find(t => t.title === track.title))) {
        // validering om du vill undvika dubbletter
        alert("Lägger till låt till spellista...");
    }
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

    renderTrackList(songs, (track) => {
        // När användare klickar + på en låt
        renderPlaylistCreation({
            availableTracks: [track],
            existingPlaylists: PlaylistManager.getPlaylists(),
            onCreate: (name, tracks) => {
                const playlist = PlaylistManager.getPlaylists().find(p => p.name === name);
                if (playlist) {
                    tracks.forEach(t => playlist.addTrack(t));
                    PlaylistManager.savePlaylist(playlist);
                } else {
                    const newPlaylist = new Playlist(name, tracks);
                    PlaylistManager.savePlaylist(newPlaylist);
                }
                refreshPlaylists();
            }
        });
    });
}