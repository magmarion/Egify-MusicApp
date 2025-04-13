function showPlaylistPopup(music) {
    const popup = document.createElement('div');
    popup.classList.add('playlist-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Add to Playlist</h3>
            <input type="text" placeholder="New playlist name" id="newPlaylistInput" />
            <button id="createAndAdd">Create and Add</button>
            <button id="closePopup">Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('closePopup').addEventListener('click', () => popup.remove());
    document.getElementById('createAndAdd').addEventListener('click', () => {
        const name = document.getElementById('newPlaylistInput').value;
        if (name) {
            addToPlaylist(name, music);
            popup.remove();
        }
    });
}

function addToPlaylist(playlistName, music) {
    const playlists = JSON.parse(localStorage.getItem("playlists") || "{}");
    if (!playlists[playlistName]) playlists[playlistName] = [];
    playlists[playlistName].push(music);
    localStorage.setItem("playlists", JSON.stringify(playlists));
}
