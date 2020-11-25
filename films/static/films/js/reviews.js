function get_reviews(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/reviews?api_key=${api_key}&language=en-US`;

    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // ### DEBUGGING ### //
        console.log(r);
        el = document.getElementById('response');
        el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);

        let reviews = document.getElementById('reviews');
        let ea_item = r.results;

        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let trailer_div = document.createElement('div');
                trailer_div.classList.add('mx-3', 'p-3');
                trailer_div.innerHTML = `<div class="border border-light p-3">` + 
                                            `<div>${ea_item[key].content}</div>` +
                                        `</div>` +
                                        `<div class="bg-darker d-flex">` + 
                                            `<div class="p-2">Rating: ${ea_item[key].author_details.rating}</div>` +
                                            `<div class="p-2 ml-auto">${ea_item[key].author}</div>` +
                                        `</div>`
                reviews.append(trailer_div);
            }
        };

    })

}
