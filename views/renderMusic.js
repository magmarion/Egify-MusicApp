export function renderGroupedMusic(groupedData) {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    for (const genre in groupedData) {
        const genreSection = document.createElement('section');
        genreSection.innerHTML = `<h2>${genre}</h2>`;

        for (const artist in groupedData[genre]) {
            const artistSection = document.createElement('div');
            artistSection.classList.add('artist-group');
            artistSection.innerHTML = `<h3>${artist}</h3>`;

            groupedMusics[genre].forEach(music => {
                const musicItem = document.createElement('div');
                musicItem.classList.add('music-card');

                musicItem.innerHTML = `
            <img src="${music.coverImage}" alt="${music.title} cover" width="200">
            <h4>${music.title}</h4>
            <p>Release Year: ${music.releaseYear}</p>
            <a href="${music.trackUrl}" target="_blank">Listen</a>
        `;
                artistSection.appendChild(item);
            });

            genreSection.appendChild(artistSection);
        }
    }

    container.appendChild(genreSection);
}
