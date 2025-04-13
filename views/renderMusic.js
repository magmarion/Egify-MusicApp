export function renderGroupedByGenre(groupedMusics) {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    for (const genre in groupedMusics) {
        const section = document.createElement('section');
        section.innerHTML = `<h2>${genre}</h2>`;

        groupedMusics[genre].forEach(music => {
            const item = document.createElement('div');
            item.classList.add('music-card');

            const addBtn = document.createElement('button');
            addBtn.textContent = '+';
            addBtn.classList.add('add-to-playlist-btn');
            addBtn.addEventListener('click', () => {
                showPlaylistPopup(music);
            });

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
            section.appendChild(item);
        });

        container.appendChild(section);
    }
}

// Popup för att välja/lägga till spellista
function showPlaylistPopup(music) {
    const popup = document.createElement('div');
    popup.classList.add('modal');

    popup.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>Add to Playlist</h3>
            <input type="text" placeholder="New playlist name" id="playlistNameInput" />
            <button id="addTrackBtn">Add</button>
        </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
    popup.querySelector("#addTrackBtn").addEventListener("click", () => {
        const name = document.getElementById("playlistNameInput").value;
        if (!name) return;

        const playlists = JSON.parse(localStorage.getItem("playlists") || "{}");
        if (!playlists[name]) playlists[name] = [];
        playlists[name].push(music);
        localStorage.setItem("playlists", JSON.stringify(playlists));

        popup.remove();
    });
}
