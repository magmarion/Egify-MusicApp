const apiKey = '67f1141db38f06160cb55ffd';
const apiUrl = 'https://playlistdata-a6f6.restdb.io/rest/musics';

async function fetchMusics() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        const musicListDiv = document.getElementById('musicList');
        if (data && data.length > 0) {
            data.forEach(music => {
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
        } else {
            console.log('Inga musikdata finns.');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

fetchMusics();
