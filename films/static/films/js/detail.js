function detail(api_key, req_type, req_id) {

    let tmdb_url = `https://api.themoviedb.org/3/${req_type}/${req_id}?api_key=${api_key}&language=en-US`;
    document.getElementById('url').innerText = tmdb_url;

    fetch(tmdb_url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        var rj = r;
        console.dir(r);
        document.getElementById('response').innerText = JSON.stringify(r, null, 4);
    });
}
