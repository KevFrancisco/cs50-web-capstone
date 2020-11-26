function discover(api_key, req_type) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/discover/${req_type}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // ### DEBUGGING ### //
        console.log(r);
        // el = document.getElementById('json-raw');
        // el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);

        let discover = document.getElementById('discover');
        let ea_item = r.results;
      
        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let title = ea_item[key].title;
                // let img_url = `https://image.tmdb.org/t/p/original${ea_item[key].poster_path}`;
                let img_url = `https://image.tmdb.org/t/p/w154${ea_item[key].poster_path}`;
                // console.log(img_url);

                let img_div = document.createElement('div');
                img_div.classList.add('w-10', 'mx-3', 'p-3', 'h-100');
                img_div.innerHTML = `<a href='detail/movie/${ea_item[key].id}' class="text-decoration-none">` +
                                    `<img src="${img_url}" class="mx-auto img-fluid" alt="${title}">` + 
                                    `<div class='small text-center text-white font-body-b h5 pt-3 h-100 mb-0'>${title}</div>` +
                                    `</a>`;
                discover.append(img_div);
            }
        };
        // OverlayScrollbars(document.querySelectorAll(".poster-container"), { });
        $('#discover').slick({
            slidesToShow: 7,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: true,
            nextArrow: '<button class="slick-custom-next"><i class="fas sc-arrow fa-chevron-right fa-3x"></i></button>',
            prevArrow: '<button class="slick-custom-prev"><i class="fas sc-arrow fa-chevron-left fa-3x"></i></button>',
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 5,
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
    // $('#discover-loader').remove();

}
