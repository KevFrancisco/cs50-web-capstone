# ShowBox
[Beta Release v0.01 is here!](https://kevfrancisco.dev/showbox)

This is a Movie and TV Show searching Web App.

Perfect for avid consumers of entertainment media.

Whether you want to keep track of a future release (AHEM Evangelion, it's been more than a decade), or just lookin' for your next weekend series binge, give ShowBox a try.

---
### External libraries

Uses the TMDB API. Thank you very much!
[Check them out here](https://www.themoviedb.org/)

Built using Django, and mix of Vanilla JS and jQuery with some Libraries:
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap MDB](https://mdbootstrap.com/) (Material Design is 💕)
- [Slick Carousel](https://kenwheeler.github.io/slick/)
- [AOS Animate On Scroll](https://michalsnik.github.io/aos/)
- [JS Cookie](https://github.com/js-cookie/js-cookie)
- [FontAwesome](https://fontawesome.com/)

Users Register using username and password, no email needed.

User Favorites and Watchlist do not interface with TMDB API, and instead uses a local model in Django.

---
### Deployment
Deployed in an ubuntu server running gunicorn and nginx.
`collectstatic` is used to separate the static files to be served by nginx.
The app was deployed on a different Django instance running postgresql instead of sqlite3.

---
### File Structure
Standard Django folder structure. I use subfolders for static and templates using the app name, this is very useful for `collectstatic`.

---
### JS Files
Files in `static/films/js/` include the external libraries listed above, and some handwritten JS.
I used jquery as minimally as possible (only for slick and some other operations).

Files with the `get_*.js` name format are usually API calls to TMDB.
Aside from data handling, these files also contain the template for the HTML to be rendered in template literals for easier formatting.

---
### Structure
- index.html
  - `get_main_hero.js` loads the Discover API from TMDB. This defaults to movies, but can switch to TV shows once the user opts to in the main navbar.
    - The carousel was initially built with slick, but I changed it to a native bootstrap carousel for ease of maintenance (less js code).
    - Has a simple spinner loader to avoid the dreaded unstyled content flash.
  - `get_carousel.js` loads the three carousels in the frontpage.
    - The function is called three times, one for each type if list:
      - Movies: Now Playing, Top Rated, Upcoming.
      - TV Shows: Airing Today, Top Rated, On the Air.
    - Each section is animated in the template side using AOS.js.

-

`get_carou`


---
### Thank You for viewing!
An honest and passionate project by John Kevin Francisco.
