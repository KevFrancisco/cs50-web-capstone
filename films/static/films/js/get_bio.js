function get_bio(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/person/${req_id}?api_key=${api_key}&language=en-US`
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        // el = document.getElementById('response');
        // el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);

        let cast_details = document.getElementById('cast_details');
        let img_url = `https://image.tmdb.org/t/p/original${r.profile_path}`;
        let profile_picture = `<img src="${img_url}" class="img-fluid z-depth-1-half" alt="${r.name}">`
        let bio; 
        if (r.biography === "") {
            bio = `No biography available :(`;
        } else {
            bio = r.biography;
        }
        let cast_details_contents = `
                    <div class="container p-3 elegant-color z-depth-3 mb-5">
                        <div class="row no-gutters p-3">
                            <div class="col-4 mr-3">
                                ${profile_picture}
                            </div>
                            <div class="col ml-3">
                                <div class="">
                                    <div class="deep-orange-text mb-1">
                                        <span class="display-4 font-alt-title text-shadow-1">
                                            ${r.name}
                                        </span>
                                    </div>
                                    <div class="grey-text mb-2">Birth: ${r.birthday} | Popularity: ${r.popularity}</div>
                                    <a href="https://www.imdb.com/name/${r.imdb_id}" class="mb-1 badge blue px-2 py-1 align-text-bottom">View in IMDB</a>
                                    <div class="opacity-80 mt-4 ws-pre-line">${bio}</div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        cast_details.insertAdjacentHTML('beforeend', cast_details_contents);
        document.title = `ShowBox: ${r.name}`;
        });

        AOS.refresh();
}
