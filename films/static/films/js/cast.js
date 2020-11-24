function get_cast(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/credits?api_key=${api_key}&language=en-US`
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        el = document.getElementById('response');
        el.innerText = JSON.stringify(r, undefined, 2);
        
        console.log(r.results);

        // let posters = document.getElementById('posters');
        let cast = document.getElementById('cast');
        let ea_item = r.cast;
        // Let's try to display the images
        for (var key in ea_item) {
                let cast_name = ea_item[key].name;
                let img_url;
                if (ea_item[key].profile_path === null) {
                    img_url = 'https://via.placeholder.com/300x450'
                } else {
                    img_url = `https://image.tmdb.org/t/p/original${ea_item[key].profile_path}`;
                };
                console.log(img_url);

                let img_div = document.createElement('div');
                img_div.classList.add('w-10', 'm-3', 'h-100');
                img_div.innerHTML = `<a href='detail/movie/' class="text-decoration-none">` +
                                    `<img src="${img_url}" class="img-fluid" alt="${cast_name}">` + 
                                    `<div class='small text-center text-white pt-3 h-100 mb-0'>${cast_name}</div>` +
                                    `</a>`;
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
