function get_discover_page(api_key, req_type) {
    let title_text;
    if (req_type === "movie") {
        title_text = "Movies";
    } else {
        title_text = "TV Shows";
    };
    document.title = `ShowBox: Discover ${title_text}`;

    // API Url from test documentation
    let url =`https://api.themoviedb.org/3/discover/${req_type}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${discover_page_number}`
    let loader_ids = [];
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // console.log(r);
        // el = document.getElementById('response');
        // el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);
        let rs = r.results;
        // console.log(rs);

        let discover_parent = document.getElementById('discover');

        for (var key in rs) {
                // Sane Names
                let id = rs[key].id;
                let poster_path = rs[key].poster_path;
                let title;
                    if (req_type === "movie") {
                        title = rs[key].title;
                    } else {
                        title = rs[key].name;
                    };
                let overview = rs[key].overview;
                let watch_date;
                    if (req_type === "movie") {
                        if (rs[key].release_date) {
                            watch_date = `Release Date: ${rs[key].release_date}`;
                        } else {
                            watch_date = 'No release date';
                        }
                    } else {
                        watch_date = `First Air Date: ${rs[key].first_air_date}`;
                    }
            if (watch_date === null) {
                watch_date = '';
            }
                
                let discover_card = document.createElement('div');
                    discover_card.classList.add('col-sm-6','col-md-4', 'col-lg-3', 'col-xl-2', 'grid-item', 'my-4', 'd-none');
                    discover_card.id = `loader_${rs[key].id}`;
                    discover_card.dataset.aos = 'fade-up';
                let rating = `<i class="fas fa-star"></i> ${rs[key].vote_average}`;
                let img_url;
                let poster_img;
                    if (rs[key].poster_path !== null) {
                            img_url = `https://image.tmdb.org/t/p/w780${poster_path}`;
                            poster_img = `
                            <a href="/showbox/detail/${req_type}/${rs[key].id}" class="text-white">
                                <img class="card-img-top" src="${img_url}" alt="${title}">
                            </a>
                            `;
                    } else {
                            img_url = 'https://via.placeholder.com/154x231'
                            poster_img = `
                            <a href="/showbox/detail/${req_type}/${rs[key].id}" class="text-white">
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
                        <div class="elegant-color z-depth-2 grid-item-content card">
                            <div class="position-relative">
                                ${poster_img}
                                <div class="position-absolute h5 top-0 right-0 text-white mt-5 px-2 py-1 rgba-stylish-strong opacity-90 z-index-1">${rating}</div>
                            </div>
                            <div class="card-body">
                                <a href="/showbox/detail/${req_type}/${rs[key].id}" class="text-white">
                                    <div class="h3">${title}</div>
                                </a>
                                    <div class="grey-text">${watch_date}</div>
                                    <div class="my-3 small">${overview}</div>
                            </div>
                        </div>
                                    `;
                discover_card.insertAdjacentHTML('beforeend', tmp_str)
                discover_parent.append(discover_card);

                loader_ids.push(`loader_${id}`);
        };

        // Images Loaded
        imagesLoaded( document.querySelectorAll('.grid-item'), function() {
            // console.log('all images are loaded');
            // Masonry Layout
            loader_ids.forEach( (l_id) => {
                document.getElementById(`${l_id}`).classList.remove('d-none');
            } )

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

    })

}
