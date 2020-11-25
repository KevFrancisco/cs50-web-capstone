function upcoming(api_key) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // console.log(r);
        // console.log(r.results);
        el = document.getElementById('json-raw');
        el.innerText = JSON.stringify(r, undefined, 2);

        let upcoming = document.getElementById('upcoming');
        let ea_item = r.results;
        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                // console.log(ea_item[key].title);
                // console.log(ea_item[key].poster_path);
                
                let title = ea_item[key].title;
                let img_url = `https://image.tmdb.org/t/p/original${ea_item[key].poster_path}`;
                // console.log(img_url);

                let img_div = document.createElement('div');
                img_div.classList.add('w-10', 'mx-3', 'p-3', 'h-100');
                img_div.innerHTML = `<a href='detail/movie/${ea_item[key].id}' class="text-decoration-none">` +
                                    `<div class='small text-center bg-darker text-muted font-body-l py-1'>${ea_item[key].release_date}</div>` +
                                    `<img src="${img_url}" class="img-fluid" alt="${title}">` + 
                                    `<div class='small text-center text-white font-body-b h5 pt-3 h-100 mb-0'>${title}</div>` +
                                    `</a>`;
                upcoming.append(img_div);
            }
        };
        // OverlayScrollbars(document.querySelectorAll(".poster-container"), { });
        $('#upcoming').slick({
            slidesToShow: 7,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
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

}
