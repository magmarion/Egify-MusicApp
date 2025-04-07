export function renderGroupedByGenre(groupedMusics) {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    for (const genre in groupedMusics) {
        const section = document.createElement('section');
        section.innerHTML = `<h2>${genre}</h2>`;

        groupedMusics[genre].forEach(music => {
            const item = document.createElement('div');
            item.classList.add('music-card');
            item.innerHTML = `
            <img src="${music.coverImage}" alt="${music.title} cover" width="200">
            <p>
                <a href="${music.trackUrl}" target="_blank" class="listen-btn">Listen</a>
            </p>
            <h3>${music.title}</h3>
            <p class="music-info">Artist: ${music.artist}</p>
            <p class="music-info">Release Year: ${music.releaseYear}</p>
        `;
            section.appendChild(item);
        }
        );
        container.appendChild(section);
    }
}