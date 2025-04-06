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
                <h3>${music.title}</h3>
                <p>Artist: ${music.artist}</p>
                <p>Release Year: ${music.releaseYear}</p>
                <p><a href="${music.trackUrl}" target="_blank">Listen</a></p>
                <img src="${music.coverImage}" alt="${music.title} cover" width="100">
            `;
            section.appendChild(item);
        }
        );
        container.appendChild(section);
    }
}