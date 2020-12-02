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
        console.log(r.results);

        let trailers = document.getElementById('trailers');
        let ea_item = r.results;
        if (ea_item.length < 1) {
            trailers.insertAdjacentHTML('beforeend', `No trailers available.`);
            return;
        };

        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let trailer_div = document.createElement('div');
                trailer_div.classList.add('mx-3', 'p-3');
                trailer_div.innerHTML = `
                            <div class="embed-responsive embed-responsive-16by9 z-depth-1-half mb-3">
                                <iframe src="https://www.${ea_item[key].site}.com/embed/${ea_item[key].key}" allowfullscreen></iframe>
                            </div>
                            <div class="p-2 text-center">${ea_item[key].name}</div>`;
                trailers.append(trailer_div);
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
        
        $('#trailers').slick({
            slidesToShow: 2,
            infinite: true,
            arrows: true,
            prevArrow: `<button class="slick-custom-prev slick-cast-prev translate-middle-y">${chev_right}</button>`,
            nextArrow: `<button class="slick-custom-next slick-cast-next translate-middle-y">${chev_left}</button>`,
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
        AOS.refresh();

    })

}
