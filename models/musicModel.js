export class Music {
    constructor(title, artist, genre, releaseYear, trackUrl, coverImage) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.releaseYear = releaseYear;
        this.trackUrl = trackUrl;
        this.coverImage = coverImage;
    }
}

export function groupByGenre(musicArray) {
    return musicArray.reduce((acc, music) => {
        if (!acc[music.genre]) acc[music.genre] = [];
        acc[music.genre].push(music);
        return acc;
    }, {});
}


