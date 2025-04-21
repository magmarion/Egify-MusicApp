export function renderUserPlaylist(playlists, { onClick } = {}) {
    const container = document.getElementById('userPlaylistSection');
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
                ${playlist.tracks.slice(0, 3).map(track => `
                    <p class="music-info">${track.title} - ${track.artist}</p>
                `).join('')}
                ${playlist.tracks.length > 3 ? '<p class="music-info">...</p>' : ''}
            `;

            card.addEventListener("click", () => {
                onClick?.(playlist);
            });

            container.appendChild(card);
        });
    }
}

export function renderGenreList(genres, onGenreClick) {
    const container = document.getElementById("musicList");
    container.innerHTML = "";
    updatePlaylistTitle("Genres");

    genres.forEach(genre => {
        const card = document.createElement("div");
        card.className = "music-card";
        card.innerHTML = `<h3>${genre}</h3>`;
        card.addEventListener("click", () => onGenreClick(genre));
        container.appendChild(card);
    });
}

export function renderArtistList(genre, artists, onArtistClick) {
    const container = document.getElementById("musicList");
    container.innerHTML = "";
    updatePlaylistTitle(`Artists in "${genre}"`);

    artists.forEach(artist => {
        const card = document.createElement("div");
        card.className = "music-card";
        card.innerHTML = `<h3>${artist}</h3>`;
        card.addEventListener("click", () => onArtistClick(artist));
        container.appendChild(card);
    });
}

export function renderTrackList(tracks, artistName) {
    const container = document.getElementById("musicList");
    container.innerHTML = "";
    updatePlaylistTitle(`Tracks by "${artistName}"`);

    tracks.forEach(track => {
        const item = document.createElement('div');
        item.classList.add('music-card');
        item.innerHTML = `
            <img src="${track.coverImage}" alt="${track.title} cover" width="200">
            <p>
                <a href="${track.trackUrl}" target="_blank" class="listen-btn">
                    <span class="btn-text">Listen</span>
                </a>
            </p>
            <h3>${track.title}</h3>
            <p class="music-info">Artist: ${track.artist}</p>
            <p class="music-info">Release Year: ${track.releaseYear}</p>
        `;

        container.appendChild(item);
    });
}

function updatePlaylistTitle(title) {
    let titleContainer = document.getElementById("playlistTitleContainer");

    if (!titleContainer) {
        titleContainer = document.createElement("div");
        titleContainer.id = "playlistTitleContainer";
        document.getElementById("musicList").prepend(titleContainer);
    }

    titleContainer.innerHTML = `<h2>${title}</h2>`;
}