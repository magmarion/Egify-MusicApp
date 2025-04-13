import { initMusicApp } from "./controller/musicController.js";
import { initPlaylistApp } from "./controller/playlistController.js";

let playlists = []; // simulerar spellistor här, kan senare sparas i localStorage

document.addEventListener("DOMContentLoaded", () => {

    // === ROUTING LOGIK ===
    if (window.location.pathname.includes("playlist.html")) {
        initPlaylistApp();
    } else {
        initMusicApp();
    }

    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    const links = document.querySelectorAll("nav a");

    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-playlist-btn")) {
            const track = JSON.parse(e.target.dataset.track);
            openModal(track);
        }
    });

    function openModal(track) {
        const modal = document.getElementById("playlistModal");
        modal.classList.remove("hidden");

        const existing = document.getElementById("existingPlaylists");
        existing.innerHTML = playlists.map(p => `
            <label>
                <input type="radio" name="playlist" value="${p.name}"> ${p.name}
            </label>
        `).join("");

        document.getElementById("addToPlaylistConfirm").onclick = () => {
            const selected = document.querySelector("input[name='playlist']:checked")?.value;
            const newName = document.getElementById("newPlaylistName").value;

            let playlist;
            if (selected) {
                playlist = playlists.find(p => p.name === selected);
            } else if (newName) {
                playlist = { name: newName, tracks: [] };
                playlists.push(playlist);
            }

            if (playlist && !playlist.tracks.find(t => t.title === track.title)) {
                playlist.tracks.push(track);
            }

            modal.classList.add("hidden");
        };

        // STÄNG MODAL
        document.querySelector(".close-btn").onclick = () => {
            modal.classList.add("hidden");
        };
    }
});
