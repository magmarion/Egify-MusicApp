export function renderMusic(musicArray) {
    const musicListDiv = document.getElementById('musicList');
    musicListDiv.innerHTML = '';

    if (!musicArray.length) {
        musicListDiv.innerHTML = '<p>No music to show.</p>';
        return;
    }
    musicArray.forEach(music => {
        const musicItem = document.createElement('div');
        musicItem.innerHTML = `
            <h3>${music.title}</h3>
            <p>Artist: ${music.artist}</p>
            <p>Genre: ${music.genre}</p>
            <p>Release Year: ${music.release_year}</p>
            <p><a href="${music.track_url}" target="_blank">Listen</a></p>
            <img src="${music.cover_image}" alt="${music.title} cover" width="100">
        `;
        musicListDiv.appendChild(musicItem);
    });
}