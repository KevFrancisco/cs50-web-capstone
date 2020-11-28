function get_carousel(api_key, req_type, section) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${section}?api_key=${api_key}&language=en-US&page=1`
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // DEBUGGING
        // console.log(r);
        // console.log(r.results);
        // el = document.getElementById('json-raw');
        // el.innerText = JSON.stringify(r, undefined, 2);
        
        // Sane names
        let section_div = $(`#${section}`);
        let ea_item = r.results;

        // Add the items to the carousel
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let title = ea_item[key].title;
                let img_url = `https://image.tmdb.org/t/p/w185${ea_item[key].poster_path}`;
                let img_div = document.createElement('div');

                img_div.classList.add('w-10', 'mx-3', 'p-3', 'h-100');
                let addtl_detail;
                switch (section) {
                    case "popular":
                        addtl_detail = ea_item[key].popularity;
                    case "upcoming":
                        addtl_detail = ea_item[key].release_date;

                    case "top_rated":
                        addtl_detail = ea_item[key].vote_average;

                }
                let temp_str = `
                    <a href='detail/movie/${ea_item[key].id}' class="text-decoration-none">
                        <div class='small text-center bg-darker text-muted font-body-l py-1'>
                            ${addtl_detail}
                        </div>
                        <div class="view overlay hoverable">
                            <img src="${img_url}" class="mx-auto img-fluid" alt="${title}">
                        </div>
                        <div class='small text-center text-white font-body-b h5 pt-3 h-100 mb-0'>${title}</div>
                    </a>
                        `;
                
                // Why use insertAdjacentHTML instead of innerHTML
                // https://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code
                img_div.insertAdjacentHTML('beforeend', temp_str)
                section_div.append(img_div);
            }
        };

        section_div.slick({
            slidesToShow: 7,
            infinite: true,
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
