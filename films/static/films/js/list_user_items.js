function list_user_items(api_key, item_type) {
    // item type can be either 'favorite' or 'watchlist'

    let main_parent = document.getElementById(`parent_${item_type}`);
    let csrftoken = Cookies.get('csrftoken');
    let url = `/user/list/${item_type}`
    
    fetch(url, {
        method: "PUT",
        headers: { "X-CSRFToken": csrftoken },
    })
    .then(Response => Response.json())
    .then(r =>{
        // DEBUGGING
        console.log(r);
        console.log(r.results);

        let tmdb_base_url = `https://api.themoviedb.org/3`;
        let user_items = r.results;

        // Loop through all items in a user's favorite or watchlist
        // each item will fetch details from tmdb asynchronously
        for (var key of Object.keys(user_items)) {
            let li = user_items[key];
            let li_i = li.media_id;
            let li_t = li.media_type;

            //Add a loader
            let loader_div = `
                <div class="h1" id="loader_${li_i}">LOADING</div>
            `;
            main_parent.insertAdjacentHTML('beforeend', loader_div);

            let tmdb_detail_url = `${tmdb_base_url}/${li_t}/${li_i}?api_key=${api_key}`;

            fetch(tmdb_detail_url, {
                method: "GET",
            })
            .then(Response => Response.json())
            .then(tr =>{
                console.log(tr);


            //////////////////////////////////////////////////////////////////////////////////
            //                          FAVORITE OR WATCHLIST ITEM                          //
            //////////////////////////////////////////////////////////////////////////////////
            let backdrop_img_url = `https://image.tmdb.org/t/p/w1280${tr.backdrop_path}`;
            let poster_img_url = `https://image.tmdb.org/t/p/w185${tr.poster_path}`;
            let rating = `<i class="fas fa-star"></i> ${tr.vote_average}`;
            let title;
            let release_date;
                if (li_t === "movie") {
                    title = tr.title;
                    more_text = 'Movies';
                    release_date = `${tr.status}: ${tr.release_date}`
                } else {
                    title = tr.name;
                    more_text = 'TV Shows';
                    release_date = `Last Aired Episode: ${tr.last_air_date}`
                }
            let genres = '';
            for (var key of Object.keys(tr.genres)) {
                if (genres.length < 1) {
                    genres += `Genres: ${tr.genres[key].name}`;
                } else {
                    genres += ` | ${tr.genres[key].name}`;
                };
            };

            // Create the Section for each Fove/WatchList Item
            // Create and set the Hero Backdrop
            let li_div = document.createElement('div');
                li_div.style.background = (
                        `linear-gradient(0deg, rgba(21, 21, 21, 0.90) 5%, rgba(21, 21, 21, 0.90) 80%) no-repeat scroll center center,
                         rgb(11,11,11) url(${backdrop_img_url}) no-repeat scroll center/cover`);
                li_div.classList.add('p-4', 'm-4');

            // Main Details section
            let details = document.createElement('div');
                details.classList.add('d-flex', 'container');
                li_div.append(details)

            main_parent.append(li_div)

            // Add the main Details Meat
            let tmp_str = ` 
                    <div class="row">
                        <div class="col-md-auto mx-auto">
                            <div class="mx-auto my-auto"> 
                                <a href="/detail/${li_t}/${li_i}" class="text-white">
                                    <img src="${poster_img_url}" class="z-depth-3 d-block mx-auto my-auto w-auto mvh-50" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-md text-shadow-1">

                            <div class="display-4 mb-0 font-alt-title">
                                <a href="/detail/${li_t}/${li_i}" class="text-white">
                                    ${title}
                                </a>
                            </div>

                            <div class="h5 mb-4 mt-2">${tr.overview}</div>

                            <div class="h1 mt-3">${rating}</div>
                            <div id="hero-genres" class="mb-1"></div>
                            <div class="mt-3 small opacity-80 grey-text">Rating: ${tr.vote_average} from ${tr.vote_count} votes</div>
                            <div class="small opacity-80 grey-text">Popularity: ${tr.popularity}</div>
                            <div class="mb-3 small opacity-80 grey-text">${release_date}</div>
                        </div>
                    </div>
                `;
                details.insertAdjacentHTML('afterbegin', tmp_str);

                // Remove Loader
                $(`#loader_${li_i}`).remove();
            });

        }; // End loop for one item

    }); // End the main fetch from local server
}
