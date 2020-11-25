function get_trailers(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/videos?api_key=${api_key}&language=en-US`;
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // ### DEBUGGING ### //
        // console.log(r);
        // el = document.getElementById('response');
        // el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);

        let trailers = document.getElementById('trailers');
        let ea_item = r.results;

        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let trailer_div = document.createElement('div');
                trailer_div.classList.add('mx-3', 'p-3');
                trailer_div.innerHTML = `<div class="ratio ratio-16x9">` + 
                                          `<iframe src="https://www.${ea_item[key].site}.com/embed/${ea_item[key].key}" allowfullscreen></iframe>` +
                                        `</div>` +
                                        `<div class="p-2 text-center">${ea_item[key].name}</div>`;
                trailers.append(trailer_div);
            }
        };
        $('#trailers').slick({
            slidesToShow: 2,
            infinite: true,
            arrows: true,
            nextArrow: '<button class="slick-custom-next"><i class="fas sc-arrow fa-chevron-right fa-3x"></i></button>',
            prevArrow: '<button class="slick-custom-prev"><i class="fas sc-arrow fa-chevron-left fa-3x"></i></button>',
            responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },
            ]
        });

    })

}
