// const apiKey = '67f1141db38f06160cb55ffd';
// const apiUrl = 'https://playlistdata-a6f6.restdb.io/rest/musics';

// export async function fetchMusics() {
//     try {
//         const response = await fetch(apiUrl, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-apikey': apiKey,
//             },
//         });
//         if (!response.ok) throw new Error('Network response was not ok');
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }


const localDataUrl = 'assets/musics.json';

export async function fetchMusics() {
    try {
        const response = await fetch(localDataUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching local JSON data:', error);
        return [];
    }
}
