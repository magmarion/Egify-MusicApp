// import { mockMusics } from "../utils/mockedData.js";
import { Music } from "../models/musicModel.js";
import { renderMusicList } from "../views/renderMusic.js";
import { fetchMusics } from "../utils/api.js";

export async function initMusicApp() {
    try {
        const rawData = await fetchMusics();
        const musics = rawData.map(data => new Music(data));
        // const musics = mockMusics.map(data => new Music(data));

        renderMusicList(musics);
    } catch (error) {
        console.error("Failed to initialize music app:", error);
    }
}
