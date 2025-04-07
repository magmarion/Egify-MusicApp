// import { fetchMusics } from "../utils/api.js";
import { mockMusics } from "../utils/mockedData.js";
import { Music } from "../models/musicModel.js";
import { groupByGenreAndArtist } from "../models/musicModel.js";
import { renderGroupedMusic } from "../views/musicView.js";

export async function initMusicApp() {
    // const rawData = await fetchMusics();
    // const musics = rawData.map(data => new Music(data));
    // const grouped = groupByGenre(musics);

    const musics = mockMusics.map(m => new Music(
        m.title,
        m.artist,
        m.genre,
        m.releaseYear,
        m.trackUrl,
        m.coverImage
    ));

    // Gruppera enligt genre + artist
    const grouped = groupByGenreAndArtist(musics);

    // Rendera den grupperade datan
    renderGroupedMusic(grouped);
}