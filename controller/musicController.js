// import { fetchMusics } from "../utils/api.js";
import { mockMusics } from "../utils/mockedData.js";
import { Music } from "../models/musicModel.js";
import { groupByGenreAndArtist } from "../models/musicModel.js";
import { renderGroupedMusic } from "../views/renderMusic.js";

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

    const grouped = groupByGenreAndArtist(musics);

    renderGroupedMusic(grouped);
}