export function renderGroupedMusic(groupedData) {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

    // Iterera över grupperad data
    for (const genre in groupedData) {
        const genreSection = document.createElement('section');
        const genreLink = document.createElement('a');
        genreLink.href = `/genre.html?genre=${encodeURIComponent(genre)}`; // Länk till en ny sida för genren
        genreLink.textContent = genre;
        genreSection.appendChild(genreLink);

        // För varje artist inom en genre
        for (const artist in groupedData[genre]) {
            const artistSection = document.createElement('div');
            artistSection.classList.add('artist-group');
            artistSection.innerHTML = `<h3>${artist}</h3>`;

            // För varje musik som hör till denna artist och genre
            groupedData[genre][artist].forEach(music => {
                const musicItem = document.createElement('div');
                musicItem.classList.add('music-card');
                musicItem.innerHTML = `
                    <img src="${music.coverImage}" alt="${music.title} cover" width="200">
                    <h4>${music.title}</h4>
                    <p>Release Year: ${music.releaseYear}</p>
                    <a href="${music.trackUrl}" target="_blank">Listen</a>
                `;
                artistSection.appendChild(musicItem);
            });

            genreSection.appendChild(artistSection);
        }

        container.appendChild(genreSection);
    }
}
