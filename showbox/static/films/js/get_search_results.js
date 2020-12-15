function get_search_results(api_key, query_str) {

    document.title = `ShowBox: Search for ${query_str}`

    let tmdb_url = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query_str}&page=${search_page_number}&include_adult=false`;
    let loader_ids = [];

    fetch(tmdb_url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // console.log(r);
        
        // Hide the Loader
        document.querySelectorAll('.hide-loader').forEach( (el) => {
            el.classList.add('d-none');
        } );
        
        let items = r.results;

        for (var key of Object.keys(items)) {
            // sr for Search Result
            let rs = items[key];
            // console.log(key);
            let req_type = rs.media_type;
                if (req_type === "person") { continue; }

            let poster_img_url = `https://image.tmdb.org/t/p/w780${rs.poster_path}`;
            let rating = `<i class="fas fa-star"></i> ${rs.vote_average}`;

            let read_more_button = `
                            <a class="mt-3 badge orange darken-2" href="/detail/${req_type}/${rs.id}">
                                <span>
                                    Read More
                                </span>
                            </a>
                                `;
            let trimmed_length = 350;
            let content = rs.overview;
            let trimmed_overview = content.length > trimmed_length ? content.substring(0, trimmed_length) + "..." + read_more_button : content.substring(0, trimmed_length);
            // console.log(trimmed_overview);

            let title;
            let release_date;
            let more_text;
                if (req_type === "movie") {
                    title = rs.title;
                    more_text = 'Movie';
                    release_date = `Release: ${rs.release_date}`
                } else {
                    title = rs.name;
                    more_text = 'TV Show';
                    release_date = `First Aired: ${rs.first_air_date}`
                }

            let poster_img;
                if (rs.poster_path !== null) {
                        poster_img = `
                        <a href="/showbox/detail/${req_type}/${rs.id}" class="text-white">
                            <img class="card-img-top" src="${poster_img_url}" alt="${title}">
                        </a>
                        `;
                } else {
                        img_url = 'https://via.placeholder.com/154x231'
                        poster_img = `
                        <a href="/showbox/detail/${req_type}/${rs.id}" class="text-white">
                            <div class="w-100 h-auto bg-primary position-relative" >
                                <div class="w-100 h-100 stylish-color-dark position-absolute">
                                    <div class="position-absolute top-50 left-50 translate-middle">
                                        <i class="fas fa-th fa-5x text-light"></i>
                                    </div>
                                </div>
                                    <img src="${img_url}" class="img-fluid opacity-0" alt="">
                            </div>
                        </a>
                            `;
                        //             `;
                }

            let tmp_str = `
                <div id="loader_${rs.id}" class="stylish-color z-depth-2 grid-item-content card d-none">
                    <div class="position-relative">
                        ${poster_img}
                        <div class="position-absolute h5 top-0 right-0 text-white mt-5 px-2 py-1 rgba-stylish-strong opacity-90 z-index-1">${rating}</div>
                    </div>
                    <div class="card-body">
                        <a href="/showbox/detail/${req_type}/${rs.id}" class="text-white">
                            <div class="h3">${title}</div>
                            <div class="small">${more_text}</div>
                        </a>
                            <div class="grey-text small">${release_date}</div>
                            <div class="my-3 small">${trimmed_overview}</div>
                    </div>
                </div>
                `;

            let search_result_card = document.createElement('div');
                search_result_card.classList.add('col-sm-6','col-md-4', 'col-lg-3', 'col-xl-2', 'grid-item', 'my-4');
                search_result_card.dataset.aos = 'fade-up';
                search_result_card.insertAdjacentHTML('beforeend', tmp_str)

            let search_results_parent = document.getElementById('search_results');
                search_results_parent.append(search_result_card);

            loader_ids.push(`loader_${rs.id}`);
        }

        // Images Loaded
        imagesLoaded( document.querySelectorAll('.grid-item'), function() {
            // console.log('all images are loaded');
            
            loader_ids.forEach( (l_id) => {
                document.getElementById(`${l_id}`).classList.remove('d-none');
            });


            // Masonry Layout
            var elem = document.querySelector('.grid');
            new Masonry( elem, {
              // options
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
                });
            //Refresh viewport after load?
            AOS.refresh();
        });

        // Animate on scroll
        AOS.refresh();
        
    });
}
