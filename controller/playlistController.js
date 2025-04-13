import { rednerUserPlaylist, renderPlaylistCreation } from "../views/renderPlaylist.js";
import { mockMusics } from "../utils/mockedData.js";

let playlist = [];

export function initPlaylistApp() {
    renderPlaylistCreation(mockMusics, handleCreatePlaylist);
    rednerUserPlaylist(playlist);
}

function handleCreatePlaylist(name, selectedTrackUrls) {
    const selectedTracks = mockMusics.filter(track => selectedTrackUrls.includes(track.trackUrl));
    playlist.push({ name, tracks: selectedTracks });
    rednerUserPlaylist(playlist);
}