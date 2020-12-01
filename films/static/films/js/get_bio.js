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
            let biography = `<p>${r.biography}</p>`
            let name = `<span class="text-capitalize">${req_type}</span> credits for <span id="cast_name">${r.name}</span>`;
                cast_details.insertAdjacentHTML('beforeend', profile_picture);
                cast_details.insertAdjacentHTML('beforeend', name);
                cast_details.insertAdjacentHTML('beforeend', biography);
        });

        AOS.refresh();
}
