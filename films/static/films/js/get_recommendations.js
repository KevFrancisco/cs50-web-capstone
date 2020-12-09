function get_recommendations(api_key, req_type, req_id) {
    // Fetch recommendations only once
    if (recommendations_loaded === true) { return; }

    // Request URL from TMDB Documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/recommendations?api_key=${api_key}&language=en-US&page=1`
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // DEBUGGING
        console.log(r);
        // console.log(r.results);
        // el = document.getElementById('json-raw');
        // el.innerText = JSON.stringify(r, undefined, 2);
        
        // Sane names
        let section_div = $('#recommendations');
        let items = r.results;

        // Add the items to the carousel
        for (var key in items) {
            if (items.hasOwnProperty(key)) {
                let title;
                    if (req_type === "movie") {
                        title = items[key].title;
                    } else {
                        title = items[key].name;
                    }
                let img_url;
                let backdrop_img;
                if (items[key].backdrop_path === null) {
                    img_url = 'http://via.placeholder.com/342x192'
                    backdrop_img = `
                                <div class="w-100 h-auto bg-primary position-relative" >
                                    <div class="w-100 h-100 stylish-color-dark position-absolute">
                                        <div class="position-absolute top-50 left-50 translate-middle">
                                            <i class="fas fa-th fa-5x text-light"></i>
                                        </div>
                                    </div>
                                    <img src="${img_url}" class="img-fluid opacity-0" alt="">
                                </div>
                                    `;
                } else {
                    img_url = `https://image.tmdb.org/t/p/w342${items[key].backdrop_path}`;
                    backdrop_img = `<img src="${img_url}" class="mx-auto img-fluid" alt="${title}">`;
                } 
                let img_div = document.createElement('div');
                    img_div.classList.add('p-3', 'h-100', 'mx-xl-4');
                let rating = `<i class="fas fa-star"></i> ${items[key].vote_average}`;
                let length = 300;
                let overview = items[key].overview;
                let trimmedString = overview.length > length ? overview.substring(0, length - 3) + "..." : overview.substring(0, length);
                let temp_str = `
                        <div class="position-relative">
                            <div class='small position-absolute top-0 right-0 text-white mt-3 px-2 py-1 rgba-stylish-strong opacity-90 z-index-1'>${rating}</div>
                            <div class="view overlay hoverable z-depth-1">
                                <a href='/detail/${req_type}/${items[key].id}' class="zoom text-decoration-none">
                                    ${backdrop_img}
                                </a>
                            </div>
                            <a href='/detail/${req_type}/${items[key].id}' class="zoom text-decoration-none">
                                <div class='text-white h4 pt-3'>${title}</div>
                            </a>
                            <div class='text-white small opacity-50'>${trimmedString}</div>
                            <a href='/detail/${req_type}/${items[key].id}' class="badge badge-primary">Read More</a>
                        </div>
                        `;
                
                // Why use insertAdjacentHTML instead of innerHTML
                // https://stackoverflow.com/questions/11515383/why-is-element-innerhtml-bad-code
                img_div.insertAdjacentHTML('beforeend', temp_str)
                section_div.append(img_div);
            }
        };

        let chev_right = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left sc-arrow" width="80" height="80" viewBox="0 0 24 24" stroke-width="0.5" stroke="#dddddd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <defs>
                                <filter id="shadow">
                                  <feDropShadow dx="0" dy="0" stdDeviation="0.9"/>
                                </filter>
                            </defs>
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <polyline points="15 6 9 12 15 18" style="filter:url(#shadow);" />
                            </svg>`
        let chev_left = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right sc-arrow" width="80" height="80" viewBox="0 0 24 24" stroke-width="0.5" stroke="#dddddd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <defs>
                                <filter id="shadow">
                                  <feDropShadow dx="0" dy="0" stdDeviation="0.9"/>
                                </filter>
                            </defs>
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <polyline points="9 6 15 12 9 18" style="filter:url(#shadow);" />
                            </svg>`

        AOS.refresh();
        recommendations_loaded = true;
        document.getElementById('recommendations').classList.remove('d-flex', 'justify-content-center');
        let element = document.getElementById('loader_recommendations');
            element.parentNode.removeChild(element);

        section_div.slick({
            slidesToShow: 5,
            infinite: true,
            arrows: true,
            nextArrow: `<button class="slick-custom-next translate-middle-y">${chev_left}</button>`,
            prevArrow: `<button class="slick-custom-prev translate-middle-y">${chev_right}</button>`,
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  }
                },
                {
                  breakpoint: 768,
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
