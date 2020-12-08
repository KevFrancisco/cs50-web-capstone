function get_main_hero(api_key, req_type) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/discover/${req_type}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    let add_hero_img_active = true;
    let add_hero_ind_active = true;
    let slide_count = 0;
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        let hero_items = document.getElementById('hero-items');
        let ea_item = r.results;

        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                // Sane defaults, let's init vars
                let title;
                    if (req_type === "movie") {
                        title = ea_item[key].title;
                    } else {
                        title = ea_item[key].name;
                    }
                let overview = ea_item[key].overview;
                let vote_average = ea_item[key].vote_average;
                let vote_count = ea_item[key].vote_count;
                let release_date = ea_item[key].release_date;
                if (req_type === "movie") {
                    release_date = `Released: ${ea_item[key].release_date}`;
                } else {
                    release_date = `First Air Date: ${ea_item[key].first_air_date}`;
                }
                let popularity = ea_item[key].popularity;
                let img_url = `https://image.tmdb.org/t/p/original${ea_item[key].backdrop_path}`;

                // HERO
                let hero_img = document.createElement('div');
                    hero_img.classList.add('carousel-item','position-relative', 'vh-100');
                        if (add_hero_img_active === true) {
                            hero_img.classList.add('active');
                            add_hero_img_active = false;
                        }
                    hero_img.style.background = (`
                            linear-gradient(0deg, rgb(11,11,11)0%, rgba(11,11,11,0.9)20%, rgba(11,11,11,0.5)60%) no-repeat center,
                            rgb(11,11,11) url(${img_url}) no-repeat scroll center/cover`);

                let hero_text = document.createElement('div');
                    hero_text.classList.add('position-absolute', 'left-0', 'bottom-0',
                                            'm-xl-5', 'p-xl-5',
                                            'm-4', 'p-4', 'w-100',
                                            'text-shadow-1', 'no-gutters');
                    let temp_str = `
                            <a href='detail/${req_type}/${ea_item[key].id}' class="text-decoration-none text-white">
                                <div class="display-2 font-title-b w-100">${title}</div>
                            </a>
                            <div class="lead font-body mb-4 col-xl-6">${overview}</div>
                            <div class="grey-text opacity-50 small">Rating: ${vote_average} from ${vote_count} votes | Popularity: ${parseInt(popularity)}</div>
                            <div class="blue-grey-text opacity-50 small ">${release_date}</div>
                                   `; 
                    hero_text.insertAdjacentHTML('beforeend', temp_str);
                let carousel_indicator = document.getElementById('hero-indicators');
                let ind_active = '';
                    if (add_hero_ind_active === true) {
                        ind_active = `class="active"`;
                        add_hero_ind_active = false;
                    }
                    let temp_str2 = `<li data-target="#hero" data-slide-to="${slide_count}" ${ind_active}></li>`;
                    slide_count += 1;
                    carousel_indicator.insertAdjacentHTML('beforeend', temp_str2);
                hero_img.append(hero_text);
                hero_items.append(hero_img);
            }
        };
        // $('#hero').slick({
        //     slidesToShow: 1,
        //     infinite: true,
        //     autoplay: true,
        //     autoplaySpeed: 5000,
        //     slidesToScroll: 1,
        //     fade: true,
        //     cssEase: 'linear',
        //     arrows: true,
        //     nextArrow: `<button class="slick-hero-next slick-custom-next">${chev_left}</button>`,
        //     prevArrow: `<button class="slick-hero-prev slick-custom-prev">${chev_right}</button>`,
        // });
        document.title = "ShowBox: Home";
        // $('#hero-loader').remove();

    })

}
