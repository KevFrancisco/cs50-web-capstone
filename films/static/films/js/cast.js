function get_cast(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/credits?api_key=${api_key}&language=en-US`
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        // el = document.getElementById('response');
        // el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);

        // let posters = document.getElementById('posters');
        let cast = document.getElementById('cast');
        let ea_item = r.cast;

        // Render the Cast Members
        for (var key in ea_item) {
                let cast_name = ea_item[key].name;
                let img_url;
                let profile_picture;
                let img_div = document.createElement('div');

                // Check if there is a profile for the cast member,
                // if null then make a placeholder instead.
                if (ea_item[key].profile_path === null) {
                    img_url = 'http://via.placeholder.com/300x450'
                    profile_picture = `
                                <div class="w-100 h-auto bg-primary position-relative">
                                    <div class="profile-placeholder bg-darker w-100 h-100 position-absolute">
                                        <div class="position-absolute top-50 left-50 translate-middle">
                                            <i class="far fa-user fa-5x text-light"></i>
                                        </div>
                                    </div>
                                    <img src="${img_url}" class="img-fluid" alt="">
                                </div>
                                    `;
                } else {
                    img_url = `https://image.tmdb.org/t/p/original${ea_item[key].profile_path}`;
                    profile_picture = `<img src="${img_url}" class="img-fluid" alt="${cast_name}">`
                };

                img_div.classList.add('w-10', 'm-3', 'h-100');
                img_div.innerHTML = `
                                    <a href='detail/movie/' class="text-decoration-none">
                                        ${profile_picture}
                                        <div class='small text-center text-white pt-3 h-100 mb-0'>${cast_name}</div>
                                    </a>
                                    `;
                cast.append(img_div);
        };
        // OverlayScrollbars(document.querySelectorAll(".poster-container"), { });
        $('#cast').slick({
            slidesToShow: 9,
            infinite: true,
            arrows: true,
            nextArrow: '<button class="slick-custom-next"><i class="fas sc-arrow fa-chevron-right fa-3x"></i></button>',
            prevArrow: '<button class="slick-custom-prev"><i class="fas sc-arrow fa-chevron-left fa-3x"></i></button>',
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 7,
                    slidesToScroll: 5,
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },
            ]
        });

    })

}