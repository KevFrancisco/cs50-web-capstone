function detail(api_key, req_type, req_id) {
    
    let tmdb_url = `https://api.themoviedb.org/3/${req_type}/${req_id}?api_key=${api_key}&language=en-US`;

    fetch(tmdb_url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.dir(r);
        document.getElementById('response').innerText = JSON.stringify(r, null, 4);
        
        // Hide the Loader
        document.querySelectorAll('.hide-loader').forEach( (el) => {
            el.classList.add('d-none');
        } );
        
        // Set the Hero Backdrop
        let img_url = `https://image.tmdb.org/t/p/original${r.backdrop_path}`;
        document.getElementById('url').innerText = img_url;
        // let backdrop = document.createElement('img');
        //     backdrop.src = `${img_url}`;
        //     backdrop.classList.add('img_fluid', 'position-absolute', 'top-0', 'left-0', 'w-100', 'h-auto');
        // document.getElementById('hero-main').append(backdrop);
        let heromain = document.getElementById('hero-main');
            heromain.style.background = (
                    `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat scroll center center,` +
                    `rgb(11,11,11) url(${img_url}) no-repeat scroll center center`);
        let details = document.getElementById('details');
            details.innerHTML= `<div class="display-1 font-title m-5">${r.original_title}</div>`;
        // linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) no-repeat scroll center center, 
        // rgb(255, 255, 255) url("https://image.tmdb.org/t/p/original/eCIvqa3QVCx6H09bdeOS8Al2Sqy.jpg") no-repeat scroll center top
    });
}
