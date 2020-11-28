function get_carousel(api_key, req_type, section) {
    // API Url from test documentation
    let url;
    if (section === "discover") {
        url =`https://api.themoviedb.org/3/discover/${req_type}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    } else {
        url = `https://api.themoviedb.org/3/${req_type}/${section}?api_key=${api_key}&language=en-US&page=1`
    }
    
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
                let rating = `<i class="fas fa-star"></i> ${ea_item[key].vote_average}`;

                img_div.classList.add('w-10', 'mx-4', 'p-3', 'h-100');
                let addtl_detail;
                switch (section) { 
                    case "discover":
                        addtl_detail = `Lorem Ipsum Dolor Sit Amet`;
                        break;
                    case "popular":
                        addtl_detail = parseInt(ea_item[key].popularity);
                        break;
                    case "upcoming":
                        addtl_detail = ea_item[key].release_date;
                        break;
                    case "top_rated":
                        addtl_detail = `<i class="fas fa-star"></i> ${ea_item[key].vote_average}`;
                        break;

                }

                let temp_str = `
                    <a href='detail/movie/${ea_item[key].id}' class="zoom text-decoration-none">
                        <div class="position-relative">
                            <div class='small position-absolute top-0 right-0 text-white mt-3 px-2 py-1 rgba-stylish-strong opacity-90 z-index-1'>${rating}</div>
                            <div class="view overlay hoverable">
                                <img src="${img_url}" class="mx-auto img-fluid" alt="${title}">
                            </div>
                            <div class='text-white font-body-b pt-3'>${title}</div>
                            <div class='text-white font-body-el mb-4'>${addtl_detail}</div>

                        </div>
                    </a>
                        `;
                
                // Why use insertAdjacentHTML instead of innerHTML
                // https://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code
                img_div.insertAdjacentHTML('beforeend', temp_str)
                section_div.append(img_div);
            }
        };

        let chev_right = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left sc-arrow" width="80" height="80" viewBox="0 0 24 24" stroke-width="0.5" stroke="#dddddd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <polyline points="15 6 9 12 15 18" />
                            </svg>`
        let chev_left = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right sc-arrow" width="80" height="80" viewBox="0 0 24 24" stroke-width="0.5" stroke="#dddddd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <polyline points="9 6 15 12 9 18" />
                            </svg>`

        section_div.slick({
            slidesToShow: 7,
            infinite: true,
            arrows: true,
            nextArrow: `<button class="slick-custom-next translat-middle">${chev_left}</button>`,
            prevArrow: `<button class="slick-custom-prev translat-middle">${chev_right}</button>`,
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
        AOS.refresh();

    })

}
