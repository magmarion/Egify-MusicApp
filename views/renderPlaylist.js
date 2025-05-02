import { DOM_IDS, clearContainerById, createSimpleCard } from "../utils/helpers.js";

export function renderUserPlaylist(playlists, { onClick } = {}) {
    const container = document.getElementById(DOM_IDS.USER_PLAYLIST_SECTION);
    if (!container) return;
    container.innerHTML = '';

    if (playlists.length === 0) {
        container.innerHTML = '<p>No playlists found.</p>';
    } else {
        playlists.forEach(playlist => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <h3>${playlist.name}</h3>
                <p class="music-info">Tracks: ${playlist.tracks.length}</p>
                ${playlist.tracks.slice(0, 3).map(track => `<p class="music-info">${track.title} - ${track.artist}</p>`).join('')}
                ${playlist.tracks.length > 3 ? '<p class="music-info">...</p>' : ''}
            `;
            card.addEventListener("click", () => onClick?.(playlist));
            container.appendChild(card);
        });
    }
}

export function renderGenreList(genres, onGenreClick) {
    clearContainerById(DOM_IDS.MUSIC_LIST);
    updatePlaylistTitle("Genres");
    const container = document.getElementById(DOM_IDS.MUSIC_LIST);
    genres.forEach(genre => container.appendChild(createSimpleCard(genre, onGenreClick)));
}

export function renderArtistList(genre, artists, onArtistClick) {
    clearContainerById(DOM_IDS.MUSIC_LIST);
    updatePlaylistTitle(`Artists in \"${genre}\"`);
    const container = document.getElementById(DOM_IDS.MUSIC_LIST);
    artists.forEach(artist => container.appendChild(createSimpleCard(artist, onArtistClick)));
}

export function renderTrackList(tracks, artistName) {
    clearContainerById(DOM_IDS.MUSIC_LIST);
    updatePlaylistTitle(`Tracks by \"${artistName}\"`);
    const container = document.getElementById(DOM_IDS.MUSIC_LIST);

    tracks.forEach(track => {
        const item = document.createElement('div');
        item.classList.add('music-card');
        item.innerHTML = `
            <img src="${track.coverImage}" alt="${track.title} cover" width="200">
            <p><a href="${track.trackUrl}" target="_blank" class="listen-btn"><span class="btn-text">Listen</span></a></p>
            <h3>${track.title}</h3>
            <p class="music-info">Artist: ${track.artist}</p>
            <p class="music-info">Release Year: ${track.releaseYear}</p>
        `;
        container.appendChild(item);
    });
}

function updatePlaylistTitle(title) {
    let titleContainer = document.getElementById(DOM_IDS.PLAYLIST_TITLE_CONTAINER);
    if (!titleContainer) {
        titleContainer = document.createElement("div");
        titleContainer.id = DOM_IDS.PLAYLIST_TITLE_CONTAINER;
        document.getElementById(DOM_IDS.MUSIC_LIST).prepend(titleContainer);
    }
    titleContainer.innerHTML = `<h2>${title}</h2>`;
}
