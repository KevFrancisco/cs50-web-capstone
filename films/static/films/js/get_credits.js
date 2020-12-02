// Sort an array by property
// Thonks to SO: https://stackoverflow.com/a/4760279/14000441
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function get_credits(api_key, req_type, req_id) {
    // API Url from test documentation
    let url = `https://api.themoviedb.org/3/person/${req_id}/${req_type}_credits?api_key=${api_key}&language=en-US`
    console.log(url);
    
    fetch(url, {
        method: "GET",
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        // el = document.getElementById('response');
        // el.innerText = JSON.stringify(r, undefined, 2);
        // console.log(r.results);
        let rs = r.cast.sort(dynamicSort("release_date")).reverse();
        // console.log(rs);

        let credits_parent = document.getElementById('credits');
        let credits_counter = 0;
        // Render the Cast Members
        for (var key in rs) {
                    if (credits_counter === 10) {
                        break;
                } else {
                    credits_counter++;
                }
                // Sane Names
                let character = rs[key].character;
                let poster_path = rs[key].poster_path;
                let title;
                    if (req_type === "movie") {
                        title = rs[key].title;
                    } else {
                        title = rs[key].name;
                    };
                let overview = rs[key].overview;
                let watch_date;
                    if (req_type === "movie") {
                        if (rs[key].release_date) {
                            watch_date = rs[key].release_date;
                        } else {
                            watch_date = 'No release date';
                        }
                    } else {
                        watch_date = rs[key].first_air_date;
                    }
            if (watch_date === null) {
                watch_date = '';
            }
                
                // Per Credit Div
                // Get it, Card div... of credits... credit.. card.
                // Okay i'll let myself out
                let credit_card = document.createElement('div');
                    credit_card.classList.add('elegant-color', 'z-depth-2', 'my-4', 'p-3', 'row');
                let img_url;
                let poster_img;
                    if (rs[key].poster_path === null) {
                            img_url = 'http://via.placeholder.com/154x231'
                            poster_img = `
                                <div class="w-100 h-auto bg-primary position-relative" >
                                    <div class="w-100 h-100 stylish-color-dark position-absolute">
                                        <div class="position-absolute top-50 left-50 translate-middle">
                                            <i class="fas fa-th fa-5x text-light"></i>
                                        </div>
                                    </div>
                                    <img src="${img_url}" class="img-fluid opacity-0" alt="">
                                </div>
                                        `;
                    } else {
                            img_url = `https://image.tmdb.org/t/p/w154${poster_path}`;
                            poster_img = `<img class="" src="${img_url}" alt="${title}">`; 
                    }

                    credit_card.innerHTML = `
                            <div class="col-auto">
                                ${poster_img}
                            </div>
                            <div class="col">
                                    <div class="h3">${title} as <span class="deep-orange-text">${character}</span></div>
                                    <div class="grey-text">${watch_date}</div>
                                    <div class="pt-5 my-3">${overview}</div>
                            </div>
                                    `;
                credits_parent.append(credit_card);
        };

        AOS.refresh();

    })

}
