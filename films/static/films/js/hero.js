function hero(api_key) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        let hero = document.getElementById('hero');
        let ea_item = r.results;
        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                // Sane defaults, let's init vars
                let title = ea_item[key].original_title;
                let overview = ea_item[key].overview;
                let vote_average = ea_item[key].vote_average;
                let vote_count = ea_item[key].vote_count;
                let release_date = ea_item[key].release_date;
                let popularity = ea_item[key].popularity;
                let img_url = `https://image.tmdb.org/t/p/original${ea_item[key].backdrop_path}`;

                // HERO
                let hero_img = document.createElement('div');
                    hero_img.classList.add('overflow-hidden', 'position-relative');
                    hero_img.innerHTML = `<img src="${img_url}" class="img-fluid" alt="${title}">` + 
                                         `<div class="bottom-fade w-100 h-100 position-absolute top-0 left-0"></div>`;
                let hero_text = document.createElement('div');
                    hero_text.classList.add('position-absolute', 'left-0', 'bottom-0', 'm-3', 'p-3');
                    hero_text.innerHTML =   `<div class="h1 mb-2 font-title w-100">${title}</div>` +
                                            `<div class="font-body mb-3">${overview}</div>` +
                                            `<div class="text-muted small">${vote_average} from ${vote_count} votes | Popularity: ${parseInt(popularity)}</div>` +
                                            `<div class="text-dark small ">Released: ${release_date}</div>`; 
                hero_img.append(hero_text);
                // Append to the HERO div
                hero.append(hero_img);
            }
        };
        // OverlayScrollbars(document.querySelectorAll(".poster-container"), { });
        $('#hero').slick({
            slidesToShow: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToScroll: 1,
            arrows: false,
        });

    })

}
