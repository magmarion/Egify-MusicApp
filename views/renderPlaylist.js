import { mockMusics } from "../utils/mockedData.js";

export function renderUserPlaylist(playlists, { onDelete, onClick } = {}) {
    const container = document.getElementById('userPlaylistSection');
    if (!container) return;
    container.innerHTML = '';

    if (playlists.length === 0) {
        container.innerHTML = renderEmptyState();
    } else {
        playlists.forEach(playlist => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <button class="delete-playlist-btn" data-name="${playlist.name}">×</button>
                <h3>${playlist.name}</h3>
                <p class="music-info">Tracks: ${playlist.tracks.length}</p>
                ${playlist.tracks.slice(0, 3).map(track => `
                    <p class="music-info">${track.title} - ${track.artist}</p>
                `).join('')}
                ${playlist.tracks.length > 3 ? '<p class="music-info">...</p>' : ''}
            `;

            // Klicka på hela kortet för att visa spellistans låtar
            card.addEventListener("click", () => {
                onClick?.(playlist);
            });

            container.appendChild(card);
        });
    }

    // Stoppa radering från att trigga kort-klicket
    document.querySelectorAll('.delete-playlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete?.(btn.dataset.name);
        });
    });
}

export function renderPlaylistCreation({ availableTracks = mockMusics, onCreate }) {
    const popup = document.createElement('div');
    popup.className = 'modal';

    popup.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>Create New Playlist</h3>
            <div class="form-group">
                <input type="text" id="playlistNameInput" placeholder=" " required>
                <label for="playlistNameInput">Playlist Name</label>
            </div>
            
            <div class="creation-options">
                <button id="createEmptyBtn">Create Empty</button>
                <button id="addTracksBtn">Add Tracks Now</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    const closePopup = () => popup.remove();

    popup.querySelector('.close-btn').addEventListener('click', closePopup);

    popup.querySelector('#createEmptyBtn').addEventListener('click', () => {
        const name = popup.querySelector('#playlistNameInput').value.trim();
        if (name) {
            onCreate(name, []);
            closePopup();
        } else {
            showInputError(popup);
        }
    });

    popup.querySelector('#addTracksBtn').addEventListener('click', () => {
        const name = popup.querySelector('#playlistNameInput').value.trim();
        if (!name) {
            showInputError(popup);
            return;
        }
        closePopup();
        renderTrackSelectionPopup(name, availableTracks, onCreate);
    });
}

function renderTrackSelectionPopup(playlistName, availableTracks, onCreate) {
    const popup = document.createElement('div');
    popup.className = 'modal';

    popup.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>Add tracks to "${playlistName}"</h3>
            <div class="tracks-selection">
                ${availableTracks.map(track => `
                    <div class="track-item">
                        <label>
                            <input type="checkbox" value="${track.trackUrl}" 
                                   data-track='${JSON.stringify(track)}'>
                            ${track.title} - ${track.artist}
                        </label>
                    </div>
                `).join('')}
            </div>
            <button id="confirmTracksBtn">Create Playlist</button>
        </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector('.close-btn').addEventListener('click', () => popup.remove());

    popup.querySelector('#confirmTracksBtn').addEventListener('click', () => {
        const selectedTracks = Array.from(
            popup.querySelectorAll('input[type="checkbox"]:checked')
        ).map(input => JSON.parse(input.dataset.track));

        if (selectedTracks.length > 0) {
            onCreate(playlistName, selectedTracks);
            popup.remove();
        } else {
            alert('Please select at least one track');
        }
    });
}

export function renderGenreList(genres, onGenreClick) {
    const container = document.getElementById("musicList");
    container.innerHTML = "";
    updatePlaylistTitle("Genres"); // ← Lägg till

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
    updatePlaylistTitle(`Artists in "${genre}"`); // ← Lägg till

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


