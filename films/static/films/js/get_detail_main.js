function detail(api_key, req_type, req_id, usr_locale, is_authenticated, is_favorite, is_watchlist) {
    console.log(`is_favorite: ${is_favorite} | is_watchlist: ${is_watchlist}`);
    let tmdb_url = `https://api.themoviedb.org/3/${req_type}/${req_id}?api_key=${api_key}&language=en-US`;
    // console.log(is_authenticated);

    fetch(tmdb_url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // console.log(r);
        // document.getElementById('response').innerText = JSON.stringify(r, null, 4);

        
        // Hide the Loader
        document.querySelectorAll('.hide-loader').forEach( (el) => {
            el.classList.add('d-none');
        } );
        
        // Get the backdrop and poster image
        let backdrop_img_url = `https://image.tmdb.org/t/p/original${r.backdrop_path}`;
        let poster_img_url = `https://image.tmdb.org/t/p/original${r.poster_path}`;
        let rating = `<i class="fas fa-star"></i> ${r.vote_average}`;
        let title;
        let more_text
        let release_date;
            if (req_type === "movie") {
                title = r.title;
                more_text = 'Movies';
                release_date = `${r.status}: ${r.release_date}`
            } else {
                title = r.name;
                more_text = 'TV Shows';
                release_date = `Last Aired Episode: ${r.last_air_date}`
            }

        // Set the Hero Backdrop
        let heromain = document.getElementById('hero-main');
            heromain.style.background = (
                    `linear-gradient(0deg, rgba(21, 21, 21, 0.90) 5%, rgba(21, 21, 21, 0.90) 80%) no-repeat scroll center center,
                     rgb(11,11,11) url(${backdrop_img_url}) no-repeat scroll center/cover`);

        // details section
        let details = document.getElementById('details');
            details.classList.add('d-flex', 'container', 'py-5');

        let is_favorite_link;
            if (is_favorite === "True") {
                is_favorite_link = `
                                    <a class="badge light-green darken-2 py-1 px-3 mr-3" id="favorite_link"
                                    onClick="toggle_favorite('${req_type}', '${req_id}');">
                                        <i class="fas fa-heart mr-1"></i>
                                        <span id="favorite_link_text">
                                            Favorite!
                                        </span>
                                    </a>
                                    `;
            } else {
                is_favorite_link = `
                                    <a class="badge indigo darken-2 py-1 px-3 mr-3" id="favorite_link"
                                    onClick="toggle_favorite('${req_type}', '${req_id}');">
                                        <i class="fas fa-heart mr-1"></i>
                                        <span id="favorite_link_text">
                                            Add to Favorites
                                        </span>
                                    </a>
                                    `;
            }
        let is_watchlist_link;
            if (is_watchlist === "True") {
                is_watchlist_link = `
                                    <a class="badge light-green darken-2 py-1 px-3" id="watchlist_link"
                                    onClick="toggle_watchlist('${req_type}', '${req_id}');">
                                        <i class="fas fa-plus mr-1"></i>
                                        <span id="watchlist_link_text">
                                            Watchlisted!
                                        </span>
                                    </a>
                                    `;
            } else {
                is_watchlist_link = `
                                    <a class="badge indigo darken-2 py-1 px-3" id="watchlist_link"
                                    onClick="toggle_watchlist('${req_type}', '${req_id}');">
                                        <i class="fas fa-plus mr-1"></i>
                                        <span id="watchlist_link_text">
                                            Add to Watchlist
                                        </span>
                                    </a>
                                    `;
            }

        let user_toggles = '';
        if (is_authenticated === "True") {
            user_toggles = `
                            <div class="d-flex mb-3 text-shadow-2">
                                ${is_favorite_link}
                                ${is_watchlist_link}
                            </div>
                            `;
            }
        let tmp_str = ` 
                <div class="row">
                    <div class="col-md-auto mx-auto py-md-5 pr-md-5 py-3 px-0">
                        <div class="mx-auto"> 
                            <img src="${poster_img_url}" class="z-depth-3 d-block mx-auto w-auto mvh-50" alt="">
                        </div>
                    </div>
                    <div class="col-md my-5 text-shadow-1">

                        <div class="d-flex align-items-center">
                            <div class="display-3 mb-0 font-alt-title">${title}</div>
                        </div>

                        ${user_toggles}
                        <div class="h5 mb-4 mt-2">${r.overview}</div>

                        <div class="mb-4 text-shadow-2">
                            <a href="#reccomendations_section"
                            class="btn btn-amber btn-sm" type="button" data-toggle="collapse" data-target="#recommendations_section"
                            aria-expanded="false" aria-controls="reccomendations_section"
                            onClick="get_recommendations('${api_key}','${req_type}','${req_id}')"
                            id="more_like_this">
                                See more ${more_text} like this
                            </a>
                            <a class="btn btn-amber btn-sm" type="button" data-toggle="collapse" data-target="#watch_providers_section"
                                    aria-expanded="false" aria-controls="reccomendations_section"
                                    onClick="get_watch_providers('${api_key}','${req_type}','${req_id}', '${usr_locale}')"
                                    id="where_to_watch" href="#watch_providers_section"
                                    >
                                Where to watch ${title}
                            </a>
                        </div>

                        <div class="h1 mt-3">${rating}</div>
                        <div id="hero-genres" class="mb-1"></div>
                        <div class="mt-3 small opacity-80 grey-text">Rating: ${r.vote_average} from ${r.vote_count} votes</div>
                        <div class="small opacity-80 grey-text">Popularity: ${r.popularity}</div>
                        <div class="mb-3 small opacity-80 grey-text">${release_date}</div>
                    </div>
                </div>
            `;
            details.insertAdjacentHTML('afterbegin', tmp_str);
            r.genres.forEach( (genre, index) => {
                    function toPipe(i) {
                        if (i != 0) {
                            return `<span class="px-2">|</span>`
                        };
                        return "";
                    };
                    document.getElementById('hero-genres').innerHTML += 
                            `${toPipe(index)}<span class="">${genre["name"]}</span>`;
            });
        document.title = `ShowBox: ${title}`
        // linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat scroll center center, 
        // rgb(255, 255, 255) url("https://image.tmdb.org/t/p/original/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg") no-repeat scroll center top
    });
}
