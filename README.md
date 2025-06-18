# Egify Music App

[🎧 Demo 🎧](https://magmarion.github.io/Egify-MusicApp/) 

Egify is a music streaming web application. It dynamically organizes songs by genres and artists, enabling users to explore music in an intuitive and categorized manner.

---

### Teck Stack: 
**HTML5, CSS3, JavaScript**

### Architecture:
**MVC (Model-View-Controller)**

### Database
**Formerly NoSQL (now local `.json` for demo)**

### Pages
**Home, Playlist (Genres → Artists → Songs)**

## Features

- Display of all songs on the homepage
- Playlist navigation by **genre** and **artist**
- Genre → Artist → Songs navigation flow
- Auto-generation of playlists based on metadata
- Originally connected to a **NoSQL database**, now using local JSON for demo
- Fully responsive UI for desktop, tablet, and mobile devices

---

## How It Works

1. **Homepage** displays a collection of all available songs.
2. **Playlist Page** allows:
   - Selecting a **genre**
   - Viewing all **artists** in that genre
   - Viewing all **songs** by the selected artist
3. Songs are loaded from a `data.json` file in the local environment.
4. The playlist generation and navigation logic is handled in JavaScript (Controller layer).
