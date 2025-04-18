import { PlaylistManager, Playlist } from "../models/musicModel.js";

export function renderMusicList(musics, playlists) {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    musics.forEach(music => {
        const item = document.createElement('div');
        item.classList.add('music-card');

        const addBtn = document.createElement('button');
        addBtn.textContent = '+';
        addBtn.classList.add('add-to-playlist-btn');
        addBtn.dataset.music = JSON.stringify(music);
        addBtn.addEventListener('click', handleAddToPlaylistClick);

        item.innerHTML = `
            <img src="${music.coverImage}" alt="${music.title} cover" width="200">
            <p>
                <a href="${music.trackUrl}" target="_blank" class="listen-btn">
                    <span class="btn-text">Listen</span>
                </a>
            </p>
            <h3>${music.title}</h3>
            <p class="music-info">Artist: ${music.artist}</p>
            <p class="music-info">Release Year: ${music.releaseYear}</p>
        `;

        item.appendChild(addBtn);
        container.appendChild(item);
    });
}

function handleAddToPlaylistClick(event) {
    const music = JSON.parse(event.target.dataset.music);
    showPlaylistPopup(music);
}

function showPlaylistPopup(music) {
    const popup = document.createElement('div');
    popup.classList.add('modal');

    popup.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>Add "${music.title}" to playlist</h3>
            
            <div class="new-playlist">
                <input type="text" placeholder="New playlist name" id="playlistNameInput" />
                <button id="createNewBtn">Create New</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    const closePopup = () => popup.remove();

    popup.querySelector('.close-btn').addEventListener('click', closePopup);

    // Hantera ny spellista
    const createBtn = popup.querySelector('#createNewBtn');
    const nameInput = popup.querySelector('#playlistNameInput');

    createBtn.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        if (newName) {
            const newPlaylist = new Playlist(newName, [music]);
            PlaylistManager.savePlaylist(newPlaylist);
            closePopup();
        } else {
            // Visa felmeddelande nära input-fältet
            nameInput.style.borderColor = '#e53e3e';
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'Please enter a playlist name';
            errorMsg.style.color = '#e53e3e';
            errorMsg.style.marginTop = '0.5rem';
            errorMsg.style.fontSize = '0.9rem';

            // Ta bort tidigare felmeddelande om det finns
            const existingError = popup.querySelector('.error-msg');
            if (existingError) existingError.remove();

            nameInput.insertAdjacentElement('afterend', errorMsg);
        }
    });

    // Återställ border-färg när användaren börjar skriva
    nameInput.addEventListener('input', () => {
        nameInput.style.borderColor = '#e2e8f0';
        const errorMsg = popup.querySelector('.error-msg');
        if (errorMsg) errorMsg.remove();
    });
}