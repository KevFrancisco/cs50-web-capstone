function discover(api_key) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        el = document.getElementById('json-raw');

        el.innerText = JSON.stringify(r, undefined, 2);
        
        console.log(r.results);

        // let posters = document.getElementById('posters');
        let posters = document.getElementById('posters');
        let ea_item = r.results;
        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                // console.log(ea_item[key].original_title);
                // console.log(ea_item[key].poster_path);
                
                let title = ea_item[key].original_title;
                let img_url = `https://image.tmdb.org/t/p/original${ea_item[key].poster_path}`;
                // console.log(img_url);

                let img_div = document.createElement('div');
                img_div.classList.add('w-10', 'm-3', 'h-100');
                img_div.innerHTML = `<img src="${img_url}" class="img-fluid" alt="${title}">` + 
                                    `<div class='small text-center text-white font-body-b h5 pt-3 h-100 mb-0'>${title}</div>`;
                posters.append(img_div);
            }
        };
        // OverlayScrollbars(document.querySelectorAll(".poster-container"), { });
        $('#posters').slick({
            slidesToShow: 9,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1100,
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
