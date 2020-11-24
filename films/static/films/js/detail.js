function detail(api_key, req_type, req_id) {
    
    let tmdb_url = `https://api.themoviedb.org/3/${req_type}/${req_id}?api_key=${api_key}&language=en-US`;

    fetch(tmdb_url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.dir(r);
        // document.getElementById('response').innerText = JSON.stringify(r, null, 4);

        
        // Hide the Loader
        document.querySelectorAll('.hide-loader').forEach( (el) => {
            el.classList.add('d-none');
        } );
        
        // Get the backdrop and poster image
        let backdrop_img_url = `https://image.tmdb.org/t/p/original${r.backdrop_path}`;
        let poster_img_url = `https://image.tmdb.org/t/p/original${r.poster_path}`;

        // Set the Hero Backdrop
        let heromain = document.getElementById('hero-main');
            heromain.style.background = (
                    `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(25, 25, 25, 0.95) 80%) no-repeat scroll center center,` +
                    `rgb(11,11,11) url(${backdrop_img_url}) no-repeat scroll center/100%`);
        let details = document.getElementById('details');
            details.classList.add('d-flex', 'container', 'py-5');
            details.innerHTML= 
                `<div class="col-auto py-5 pr-5">` +
                    `<div class="mx-auto">` + 
                        `<img src="${poster_img_url}" class="d-block mx-auto w-auto mvh-50" alt="${r.original_title}">` +
                    `</div>` +
                `</div>` +
                `<div class="col mr-5 my-5">` +
                    `<div class="display-1 pb-3 font-title">${r.original_title}</div>` +
                    `<div class="pb-5 h5">${r.overview}</div>` +
                    `<div id="hero-genres" class="pb-1"></div>` +
                    `<div class="pt-3 small text-muted">Rating: ${r.vote_average} from ${r.vote_count} votes</div>` +
                    `<div class="small text-muted">Popularity: ${r.popularity}</div>` +
                    `<div class="pb-3 small text-muted">${r.status}: ${r.release_date}</div>` +
                `</div>`;
                r.genres.forEach( (genre, index) => {
                        function toPipe(i) {
                            if (i != 0) {
                                return `<span class="px-2">|</span>`
                            };
                            return "";
                        };
                        document.getElementById('hero-genres').innerHTML += 
                                `${toPipe(index)}<span class="">${genre["name"]}</span>`;
                });
        // linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat scroll center center, 
        // rgb(255, 255, 255) url("https://image.tmdb.org/t/p/original/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg") no-repeat scroll center top
    });
}
