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
            let img_url = `https://image.tmdb.org/t/p/w185${r.profile_path}`;
            let profile_picture = `<img src="${img_url}" class="img-fluid" alt="${r.name}">`
        let cast_details_contents = `
                    <div class="container elegant-color-dark z-depth-3 mb-5">
                        <div class="row py-3">
                            <div class="col-auto">
                                ${profile_picture}
                            </div>
                            <div class="col">
                                <div class="">
                                    <div class="deep-orange-text h2">${r.name}</div>
                                    <div class="opacity-80">${r.biography}</div>
                                    <div class="small">Lorem</div>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        cast_details.insertAdjacentHTML('beforeend', cast_details_contents);

        });

        AOS.refresh();
}
