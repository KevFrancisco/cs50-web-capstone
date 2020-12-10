function get_watch_providers(api_key, req_type, req_id, usr_locale) {

    // Fetch Watch Providers Only Once
    if (watch_providers_loaded === true) { 
        document.querySelector('#hero-main').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return;
    }
    
    // Request URL from TMDB Documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/watch/providers?api_key=${api_key}`
    
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
        
        // Select by jQuery, document.getElementById breaks slick carousel
        // Man, jQuery is an ecosystem, huh?
        let section_div = $('#watch_providers');
        let section_div2 = document.getElementById('watch_providers')
        let watch_providers = r.results[usr_locale];
        // console.log(watch_providers.type)
        if (!(watch_providers)) {
            let tmp_str = `
                <div class="p-3 m-3">
                    No Available Watch Providers for your locale :(
                </div>
            `;
            section_div2.insertAdjacentHTML('beforeend', tmp_str);
            let element = document.getElementById('loader_watch_providers');
                element.parentNode.removeChild(element);
            watch_providers_loaded = true;
            return;
        }
        console.log(watch_providers);
        let available_watch_types = [];

        // Get available watch_types for locale
        // Excluding the link
        for (var key of Object.keys(watch_providers)) {
            if (key !== 'link') {
                available_watch_types.push(key);
            }
        }

        // Let's constant the base url so we can call it over and over per provider
        let provider_logo_base_url = `https://image.tmdb.org/t/p/w300`;

        // Set the link at the Watch Provider Section Header
        let tmdb_watch_providers = watch_providers['link'];
            document.getElementById('tmdb_watch_provider_link').href = tmdb_watch_providers;

        // Loop through all watch_types and display each entry
        for (var i = 0; i < available_watch_types.length; i++) {

            // Loop through all watch providers in each watch type
            let watch_type = available_watch_types[i];

            for (var key of Object.keys(watch_providers[watch_type])) {
                let watch_entry = watch_providers[watch_type][key];
                let entry_label;
                if (watch_type === "buy") {
                    entry_label = "Buy"
                } else if (watch_type === "flatrate") {
                    entry_label = "Stream"
                } else {
                    entry_label = "Rent"
                }

                let tmp_str = `
                    <div class="mx-5 text-center">
                        <div class="text-center cyan darken-2 small text-uppercase">
                            ${entry_label}
                        </div>
                        <img src="${provider_logo_base_url}${watch_entry.logo_path}"
                         class="img-thumbnail mx-auto rounded-0"
                         alt="${watch_entry.provider_name}">
                        <div class="mt-2">${watch_entry.provider_name}</div>
                    </div>
                `;

                section_div2.insertAdjacentHTML('beforeend', tmp_str);

            }
        }

        watch_providers_loaded = true;

        // Remove Spinner Loader and Formatting
        document.getElementById('watch_providers').classList.remove('d-flex', 'justify-content-center');
        let element = document.getElementById('loader_watch_providers');
            element.parentNode.removeChild(element);


        
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

        section_div.slick({
            slidesToShow: 7,
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
        document.querySelector('#watch_providers').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

    })

}
