import { DOM_IDS, clearContainerById } from "../utils/helpers.js";

export function renderMusicList(musics) {
    const container = document.getElementById(DOM_IDS.MUSIC_LIST);
    container.innerHTML = '';

    musics.forEach(music => {
        const item = document.createElement('div');
        item.classList.add('music-card');
        item.innerHTML = `
            <img src="${music.coverImage}" alt="${music.title} cover" width="200">
            <p><a href="${music.trackUrl}" target="_blank" class="listen-btn"><span class="btn-text">Listen</span></a></p>
            <h3>${music.title}</h3>
            <p class="music-info">Artist: ${music.artist}</p>
            <p class="music-info">Release Year: ${music.releaseYear}</p>
        `;
        container.appendChild(item);
    });
}