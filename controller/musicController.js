import { fetchMusics } from "../utils/api.js";
import { Music, groupByGenre } from "../models/musicModel.js";
import { renderGroupedByGenre } from "../views/renderMusic.js";

export async function initMusicApp() {
    const rawData = await fetchMusics();
    const musics = rawData.map(data => new Music(data));
    const grouped = groupByGenre(musics);
    renderGroupedByGenre(grouped);
}