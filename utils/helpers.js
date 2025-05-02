export const DOM_IDS = {
    MUSIC_LIST: "musicList",
    USER_PLAYLIST_SECTION: "userPlaylistSection",
    PLAYLIST_TITLE_CONTAINER: "playlistTitleContainer"
};

export function clearContainerById(id) {
    const container = document.getElementById(id);
    if (container) container.innerHTML = "";
}

export function groupByGenre(musicArray) {
    return musicArray.reduce((acc, music) => {
        const genre = music.genre || "Unknown";
        if (!acc[genre]) acc[genre] = [];
        acc[genre].push(music);
        return acc;
    }, {});
}


export function createSimpleCard(text, onClick) {
    const card = document.createElement("div");
    card.className = "music-card";
    card.innerHTML = `<h3>${text}</h3>`;
    card.addEventListener("click", () => onClick?.(text));
    return card;
}