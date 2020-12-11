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

                let genres = '';
                for (var key of Object.keys(tr.genres)) {
                    if (genres.length < 1) {
                        genres += `Genres: ${tr.genres[key].name}`;
                    } else {
                        genres += ` | ${tr.genres[key].name}`;
                    };
                };

                let tmp_str = `
                    <div class="light-blue darken-2 p-3 m-3">
                        <div class="h3">
                            ${tr.title}
                        </div>
                        <div>
                            ${genres}
                        </div>
                        <div>
                            ${tr.vote_average}
                        </div>
                        <div>
                            ${tr.popularity}
                        </div>
                        <div>
                            ${tr.status}
                        </div>
                        <div>
                            ${tr.release_date}
                        </div>
                        <div>
                            ${tr.poster_path}
                        </div>
                        <div>
                            ${tr.overview}
                        </div>
                    </div>

                `;

                main_parent.insertAdjacentHTML('beforeend', tmp_str);

                // Remove Loader
                $(`#loader_${li_i}`).remove();
            });

        }; // End loop for one item

    }); // End the main fetch from local server
}
