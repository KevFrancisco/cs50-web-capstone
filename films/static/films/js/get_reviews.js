function get_reviews(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/${req_type}/${req_id}/reviews?api_key=${api_key}&language=en-US`;

    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        // ### DEBUGGING ### //
        // console.log(r);
        // el = document.getElementById('response');
        // el.innerText = JSON.stringify(r, undefined, 2);

        let reviews = document.getElementById('reviews');
        let ea_item = r.results;
        if (ea_item.length < 1) {
            reviews.innerHTML = `No reviews available.`;
            return;
        };

        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let trailer_div = document.createElement('div');
                trailer_div.classList.add('light-blue', 'darken-4', 'mb-3', 'card');

                let rating;
                    if (ea_item[key].author_details.rating === null) {
                        rating = '';
                    } else {
                        rating = `<div class="h6 my-auto">Rating: ${ea_item[key].author_details.rating}</div>`;
                    }
                // Trim the review to 250 chars, then add ellipses
                let content = ea_item[key].content;
                let length = 500;
                let trimmedString = content.length > length ? content.substring(0, length - 3) + "..." : content.substring(0, length);

                let author = ea_item[key].author;
                let rev_url = ea_item[key].url;
                trailer_div.innerHTML = `
                                    <div class="card-body">
                                        <div class="light-blue darken-4">
                                            <div>
                                                ${trimmedString}
                                                <br>
                                                
                                                <a href="${rev_url}" class="mt-2 badge badge-primary">
                                                    <span>
                                                        Read More
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card-footer">
                                        <div class="d-flex justify-content-between">
                                            ${rating}
                                            <div class="h6 my-auto">${author}</div>
                                            <div><a class="btn btn-orange btn-sm m-0" href="${rev_url}">View in TMDB</a></div>
                                        </div>
                                    </div>
                                `;
                reviews.append(trailer_div);
            }
        };
        AOS.refresh();

    })

}
