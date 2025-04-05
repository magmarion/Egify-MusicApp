import { fetchMusics } from "./utils/api.js";
import { renderMusic } from "./views/renderMusic.js";

async function initApp() {
    const musics = await fetchMusics();
    renderMusic(musics);
}

initApp();