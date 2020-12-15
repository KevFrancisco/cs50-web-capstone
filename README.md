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
Deployed in an linode ubuntu server running gunicorn and nginx.
`collectstatic` is used to separate the static files to be served by nginx.
The app was deployed on a new Django instance running postgresql instead of sqlite3.
I uploaded the app folder using scp, then ssh-ed to the server to configure Django, which I started with a fresh migration.

---
### File Structure
Standard Django folder structure, I use subfolders for static and templates using the app name, which is very useful for `collectstatic`.

---
### JS Files
Files in `static/films/js/` include the external libraries listed above, and some handwritten JS.
I used jquery as minimally as possible (only for slick and some other operations).

Files with the `get_*.js` name format are usually API calls to TMDB.
Aside from data handling, these files also contain the template for the HTML to be rendered in template literals for easier formatting.

---
### Structure
Let me walk you through the basic flow of the app by examing the templates.
* Note: The API key used is taken from an environment variable (both in development and initial deployment), however in the final deployment I opted to use a const variable instead. *


- #### index.html - The Main Homepage
  - `get_main_hero.js` loads the Discover API from TMDB. This defaults to movies, but can switch to TV shows once the user opts to in the main navbar.
    - The carousel was initially built with slick, but I changed it to a native bootstrap carousel for ease of maintenance (less js code).
    - The maximum size the hero can get is 80vh, so that the user is invited to scroll down.
    - Has a simple spinner loader to avoid the dreaded unstyled content flash.
  - `get_carousel.js` loads the three carousels in the frontpage.
    - The function is called three times, one for each type of list:
      - Movies: Now Playing, Top Rated, Upcoming.
      - TV Shows: Airing Today, Top Rated, On the Air.
      - The type of list to be queried to TMDB is set in a user session variable.
    - Each section is animated in the template side using AOS.js.

- #### detail.html - Item Details
  This is where a user decides whether to watch a Movie or TV Show. There's a lot of things happening in this page, let's walk through all of them :)
  - `get_detail_main.js` loads the main section for the item. This section includes the Title, Overview, Images, and all the basic details.
    - This section includes four important links:
      - `put_favorites.js` is an API call to an internal url that adds an instance of the Favorite model.
      - `put_watchlist.js` functions similarly to favorites, I separated them for easier addition of future features should favorites and watchlist diverge in display or data format.
      - `get_recommendations.js` populates the reccomendations section (which is a bootstrap collapsible), it lists similar items to the current one. I use this alot when searching for a film or series, very handy!
      - `get_watch_providers.js` similar to reccomendations, it populates the watch providers list.
        - The cool thing about is that it's locale sensitive.
        - A user may set his or her locale in the `My Account` page and the Watch Providers section will display accordingly.
        - Unfortunately TMDB does not include the deeplinks for each provider, however I included the link to TMDB page which does!
        - Click the header to go to TMDB.
  - `get_cast.js` get's list (similar to `get_carousel.js`) of the item's cast.
    - In case there is no profile image for the actor/actress, a placeholder is displayed instead (using a fontawesome icon).
  - `get_trailers.js` displays all the related trailers, it is youtube embed displayed in slick carousel. I decided against displaying it in a user modal dialog since I think it disrupts user experience.
  - `get_reviews.js` lists all user reviews in TMDB together with a rating and a user name, with the review content respecting whitespace as the original review.
    - Displayed in a card column layout, made responsive with css overrides in `styles.css`.
    - For a review, since it can contain a LOT of characters at times, the initial display is trimmed to 500 characters.
    - Then I display a `Read more` link to a modal dialog that displays the full review, it works wonderfully in this case!.
    - I also put the original link to TMDB to support them.

- #### discover.html - Discover new shows
  - Lists either movies or tv shows that are relatively new and popular!
  - Uses the `masonry` and `images_loaded` library to display the item cards beautifully
  - I use vanilla javascript to detect if a user is close to the bottom, and if true will call the next page from TMDB and display it seamlessly!
  - Initially the new page is not displayed (otherwise it breaks the layout) and only shows after the images are loaded using the  `imagesLoaded library`. 

- #### search.html - Search results
  - Similar to the discover page, but instead displays mixed results of TV shows or Movies.

- #### user_items.html - At last! Proper Django template use!
  - This single template renders both the User's Favorites and User's Watchlist depending on the request.
  - Uses a similar layout to the detail page for coherence.

- #### User Pages
  - login.html
    - A very simple login form :)
  - registor.html
    - A very simple register form :P
  - my_account.html
    - A *not so simple* :O account settings page.
    - Uses a Django ModelForm from Abstract user
      - Abstract user is extended with an API_KEY field and a profile_img field.
    - The user may select an avatar image to display in the navbar.
      - `list_user_icons.js` populates the avatar options section, and handles the logic.
      - Built with a simple border display onClick handwritten in js.
      - the onClick event sets the `profile_img` hidden form field.
    - There are a set number of presets, I think it is unnecessary to allow user image uploads in this use case. The validation and extra libraries would make the app bloated.

---
### Thank You!
I am open to criticism! If you think I could have coded a section better or I made a flat-out mistake, please message me or submit a PR and I will work on it pronto.
An honest and passionate project by John Kevin Francisco 2020.
