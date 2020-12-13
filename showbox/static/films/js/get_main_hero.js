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
                let img_url = `https://image.tmdb.org/t/p/w1280${ea_item[key].backdrop_path}`;

                // HERO
                let hero_img = document.createElement('div');
                    hero_img.classList.add('carousel-item', 'position-relative', 'aspect-1');
                        if (add_hero_img_active === true) {
                            hero_img.classList.add('active');
                            add_hero_img_active = false;
                        }
                    hero_img.style.background = (`
                            linear-gradient(0deg, rgb(11,11,11)0%, rgba(11,11,11,0.9)20%, rgba(11,11,11,0.5)60%) no-repeat center,
                            rgb(11,11,11) url(${img_url}) no-repeat scroll center/cover`);
                    let img_sizer = `
                                <div class="mvh-80">
                                    <img src="${img_url}" alt="" class="hide-me img-fluid">
                                </div>
                                `;
                    hero_img.insertAdjacentHTML('beforeend', img_sizer);

                let hero_text = document.createElement('div');
                    hero_text.classList.add('position-absolute', 'left-0', 'bottom-0',
                                            'text-shadow-1', 'no-gutters');
                    let temp_str = `
                            <div class="px-md-3 px-lg-4 px-xl-5 m-5">
                                <a href='/showbox/detail/${req_type}/${ea_item[key].id}' class="text-decoration-none text-white">
                                    <div class="display-2 font-title-b mb-4 w-100 d-none d-lg-block">${title}</div>
                                    <div class="h1 font-title-b mb-3 w-100 d-none d-sm-block d-lg-none">${title}</div>
                                    <div class="h5 font-title-b mb-2 w-100 d-block d-sm-none">${title}</div>
                                </a>
                                <div class="lead pl-0 font-body mb-4 col-xl-9 d-none d-xl-block">${overview}</div>
                                <div class="font-body pl-0 mb-4 col-xl-9 d-none d-lg-block d-xl-none">${overview}</div>
                                <div class="font-body small pl-0 mb-4 col-xl-9 d-none d-md-block d-lg-none">${overview}</div>
                                <div class="grey-text small">Rating: ${vote_average} from ${vote_count} votes | Popularity: ${parseInt(popularity)}</div>
                                <div class="blue-grey-text small d-none d-lg-block">${release_date}</div>
                                <div class="pt-3 pb-sm-2 pb-md-3 pb-lg-4 pb-xl-5"></div>
                            </div>
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
