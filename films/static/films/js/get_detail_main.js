function detail(api_key, req_type, req_id) {
    let tmdb_url = `https://api.themoviedb.org/3/${req_type}/${req_id}?api_key=${api_key}&language=en-US`;

    fetch(tmdb_url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // console.log(r);
        // document.getElementById('response').innerText = JSON.stringify(r, null, 4);

        
        // Hide the Loader
        document.querySelectorAll('.hide-loader').forEach( (el) => {
            el.classList.add('d-none');
        } );
        
        // Get the backdrop and poster image
        let backdrop_img_url = `https://image.tmdb.org/t/p/original${r.backdrop_path}`;
        let poster_img_url = `https://image.tmdb.org/t/p/original${r.poster_path}`;
        let title;
            if (req_type === "movie") {
                title = r.title;
            } else {
                title = r.name;
            }

        // Set the Hero Backdrop
        let heromain = document.getElementById('hero-main');
            heromain.style.background = (
                    `linear-gradient(0deg, rgba(21, 21, 21, 0.90) 5%, rgba(21, 21, 21, 0.90) 80%) no-repeat scroll center center,
                     rgb(11,11,11) url(${backdrop_img_url}) no-repeat scroll center/cover`);
        let details = document.getElementById('details');
            details.classList.add('d-flex', 'container', 'py-5');
            let more_text;
        if (req_type === "movie") {
            more_text = 'Movies';
        } else {
            more_text = 'TV Shows';
        }
            let tmp_str = ` 
                    <div class="row">
                        <div class="col-md-auto mx-auto py-md-5 pr-md-5 py-3 px-0">
                            <div class="mx-auto"> 
                                <img src="${poster_img_url}" class="z-depth-3 d-block mx-auto w-auto mvh-50" alt="${title}">
                            </div>
                        </div>
                        <div class="col-md my-5 text-shadow-1">
                            <div class="display-3 pb-3 font-alt-title">${title}</div>
                            <div class="h5 mb-4">${r.overview}</div>

                            <button class="btn btn-amber btn-sm mb-5 mx-0" type="button" data-toggle="collapse" data-target="#reccomendations_section"
                                    aria-expanded="false" aria-controls="reccomendations_section"
                                    onClick="get_recommendations('${api_key}','${req_type}','${req_id}')"
                                    id="more_like_this"
                                    >
                                See more ${more_text} like this
                            </button>

                            <div id="hero-genres" class="pb-1 mt-3"></div>
                            <div class="pt-3 small opacity-80 grey-text">Rating: ${r.vote_average} from ${r.vote_count} votes</div>
                            <div class="small opacity-80 grey-text">Popularity: ${r.popularity}</div>
                            <div class="pb-3 small opacity-80 grey-text">${r.status}: ${r.release_date}</div>
                        </div>
                    </div>
                `;
                details.insertAdjacentHTML('afterbegin', tmp_str);
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
        document.title = `ShowBox: ${title}`
        // linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat scroll center center, 
        // rgb(255, 255, 255) url("https://image.tmdb.org/t/p/original/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg") no-repeat scroll center top
    });
}
