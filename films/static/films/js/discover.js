function discover(api_key) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        el = document.getElementById('json-raw');

        el.innerText = JSON.stringify(r, undefined, 2);
        
        console.log(r.results);

        // let posters = document.getElementById('posters');
        let posters = document.getElementById('posters');
        let ea_item = r.results;
        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                // console.log(ea_item[key].original_title);
                // console.log(ea_item[key].poster_path);
                
                let title = ea_item[key].original_title;
                let img_url = `https://image.tmdb.org/t/p/original${ea_item[key].poster_path}`;
                // console.log(img_url);

                let img_div = document.createElement('div');
                img_div.classList.add('w-10', 'm-3', 'h-100');
                img_div.innerHTML = `<img src="${img_url}" class="img-fluid" alt="${title}"><div class='h6 text-center text-white p-3 h-100 mb-0'>${title}</div>`;
                posters.append(img_div);
            }
        };
        // OverlayScrollbars(document.querySelectorAll(".poster-container"), { });
        $('#posters').slick({
            slidesToShow: 7,
            infinite: true,
            slidesToScroll: 7,
            arrows: true,
        });

    })

}
