export class Music {
    constructor({ title, artist, genre, releaseYear, trackUrl, coverImage }) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.releaseYear = releaseYear;
        this.trackUrl = trackUrl;
        this.coverImage = coverImage;
    }
}
export class Playlist {
    constructor(name, tracks = []) {
        this.name = name;
        this.tracks = tracks;
    }

    addTrack(track) {
        if (!this.tracks.some(t => t.trackUrl === track.trackUrl)) {
            this.tracks.push(track);
            return true;
        }
        return false;
    }
    removeTrack(trackUrl) {
        this.tracks = this.tracks.filter(t => t.trackUrl !== trackUrl);
    }
}

export function groupByGenre(musicArray) {
    return musicArray.reduce((acc, music) => {
        if (!acc[music.genre]) acc[music.genre] = [];
        acc[music.genre].push(music);
        return acc;
    }, {});
}
export class PlaylistManager {
    static STORAGE_KEY = "playlists";

    static getPlaylists() {
        const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
        return Object.entries(data).map(([name, tracks]) => {
            const musicObjects = tracks.map(track => new Music(track));
            return new Playlist(name, musicObjects);
        });
    }

    static savePlaylist(playlist) {
        const playlists = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
        playlists[playlist.name] = playlist.tracks;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playlists));
    }

    static deletePlaylist(name) {
        const playlists = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
        delete playlists[name];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playlists));
    }
}