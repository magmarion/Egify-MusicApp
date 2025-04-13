import { mockMusics } from "../utils/mockedData.js";
import { Playlist, PlaylistManager } from "../models/musicModel.js";
import { renderUserPlaylist, renderPlaylistCreation } from "../views/renderPlaylist.js";

export function initPlaylistApp() {
    refreshPlaylists();

    document.getElementById("newPlaylistBtn")?.addEventListener("click", () => {
        renderPlaylistCreation({
            availableTracks: mockMusics,
            existingPlaylists: PlaylistManager.getPlaylists(),
            onCreate: (name, tracks) => {
                const playlist = new Playlist(name, tracks);
                PlaylistManager.savePlaylist(playlist);
                refreshPlaylists();
            }
        });
    });
}

function refreshPlaylists() {
    renderUserPlaylist(PlaylistManager.getPlaylists(), {
        onDelete: (playlistName) => {
            PlaylistManager.deletePlaylist(playlistName);
            refreshPlaylists();
        },
        onAddTrack: (playlistName, track) => {
            const playlists = PlaylistManager.getPlaylists();
            const playlist = playlists.find(p => p.name === playlistName);
            if (playlist) {
                playlist.addTrack(track);
                PlaylistManager.savePlaylist(playlist);
                refreshPlaylists();
            }
        }
    });
}