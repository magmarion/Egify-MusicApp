export function renderUserPlaylist(playlists, { onDelete } = {}) {
    const container = document.getElementById('musicList');
    container.innerHTML = '<h2>Your Playlists</h2>';

    const playlistsContainer = document.createElement('div');
    playlistsContainer.className = 'playlists-container';

    // "Create New" card
    const newPlaylistCard = document.createElement('div');
    newPlaylistCard.className = 'music-card new-playlist-card';
    newPlaylistCard.innerHTML = `
        <div class="plus-icon">+</div>
        <h3>Create New Playlist</h3>
    `;
    newPlaylistCard.addEventListener('click', () => {
        document.getElementById('newPlaylistBtn')?.click();
    });
    playlistsContainer.appendChild(newPlaylistCard);

    // Existing playlists
    playlists.forEach(playlist => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'music-card';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-playlist-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete?.(playlist.name);
        });

        playlistCard.innerHTML = `
            <h3>${playlist.name}</h3>
            <p class="music-info">Tracks: ${playlist.tracks.length}</p>
            ${playlist.tracks.slice(0, 3).map(track => `
                <p class="music-info">${track.title} - ${track.artist}</p>
            `).join('')}
            ${playlist.tracks.length > 3 ? '<p class="music-info">...</p>' : ''}
        `;

        playlistCard.appendChild(deleteBtn);
        playlistsContainer.appendChild(playlistCard);
    });

    container.appendChild(playlistsContainer);
}

export function renderPlaylistCreation({ availableTracks, onCreate }) {
    const popup = document.createElement('div');
    popup.className = 'modal';

    popup.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>Create New Playlist</h3>
            <input type="text" placeholder="Playlist name" id="playlistNameInput" />
            
            <div class="tracks-selection">
                <h4>Select Tracks:</h4>
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
            
            <button id="createPlaylistBtn">Create</button>
        </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector('.close-btn').addEventListener('click', () => popup.remove());
    
    popup.querySelector('#createPlaylistBtn').addEventListener('click', () => {
        const name = document.getElementById('playlistNameInput').value.trim();
        const selectedTracks = Array.from(
            popup.querySelectorAll('input[type="checkbox"]:checked')
        ).map(input => JSON.parse(input.dataset.track));

        if (name && selectedTracks.length > 0) {
            onCreate(name, selectedTracks);
            popup.remove();
        } else {
            alert('Please enter a name and select at least one track');
        }
    });
}