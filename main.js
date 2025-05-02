import { initMusicApp } from "./controller/musicController.js";
import { initPlaylistApp } from "./controller/playlistController.js";

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("playlist.html")) {
        initPlaylistApp();
    } else {
        initMusicApp();
    }

    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    const links = document.querySelectorAll("nav a");

    hamburger.addEventListener("click", () => {
        const expanded = nav.classList.toggle("active");
        document.body.classList.toggle("menu-open");
        hamburger.setAttribute("aria-expanded", expanded);
    });    

    links.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
});
