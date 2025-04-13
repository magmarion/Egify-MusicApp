export function renderPlaylistCreation() {
    const container = document.getElementById("musicList");
    container.innerHTML = `
        <h2>Create New Playlist</h2>
        <input id="playlistName" placeholder="Playlist Name" />
        <div id="musicSelect"></div>
        <button id="createPlaylistbtn">Create Playlist</button>
        <hr />
        `;

    const musicSelect = document.getElementById("musicSelect");
    musicList.forEach(track => {
        const trackDiv = document.createElement("div");
        trackDiv.innerHTML = `
                <label>
                <input type="checkbox" value="${track.trackUrl}" />
                ${track.title} - ${track.artist}
            </label>
        `;
        musicSelect.appendChild(trackDiv);
    });


    document.getElementById("createPlaylistbtn").addEventListener("click", () => {
        const playlistName = document.getElementById("playlistName").value;
        const selectedTracks = Array.from(musicSelect.querySelectorAll("input:checked")).map(input => input.value);
        if (playlistName && selectedTracks.length) onCreate(playlistName, selectedTracks);
    });
}

export function rednerUserPlaylist(playlist) {
    const container = document.getElementById("musicList");
    playlist.forEach(pl => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${pl.name}</h3>
            <ul>
                ${pl.tracks.map(t => `<li>${t.title} - ${t.artist}</li>`).join("")}
            </ul>
            `;
        container.appendChild(div);

    });

}