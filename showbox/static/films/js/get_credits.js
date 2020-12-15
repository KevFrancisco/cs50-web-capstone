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
        let sort_field;
            if (req_type === "movie") {
                sort_field = "release_date";
            } else {
                sort_field = "first_air_date";
            };
        let rs = r.cast.sort(dynamicSort(sort_field)).reverse();
        console.log(rs);

        let credits_parent = document.getElementById('credits');
        let credits_counter = 0;

        for (var key in rs) {
                if (credits_counter === 100) {
                        break;
                } else {
                    credits_counter++;
                }
                // Sane Names
                let character;
                    if (rs[key].character === "") {
                        character = "";
                    } else {
                        character = ` as <span class="deep-orange-text">${rs[key].character}</span>`;
                    }
                let backdrop_path = rs[key].backdrop_path;
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
                    credit_card.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'grid-item', 'my-4');
                    credit_card.dataset.aos = 'fade-up';
                let img_url;
                let poster_img;
                    if (rs[key].backdrop_path !== null) {
                            img_url = `https://image.tmdb.org/t/p/w780${backdrop_path}`;
                            poster_img = `
                            <a href="/showbox/detail/${req_type}/${rs[key].id}" class="text-white">
                                <img class="card-img-top" src="${img_url}" alt="${title}">
                            </a>
                            `;
                    } else {
                            img_url = 'https://via.placeholder.com/154x231'
                            poster_img = `
                            <a href="/showbox/detail/${req_type}/${rs[key].id}" class="text-white">
                                <div class="w-100 h-auto bg-primary position-relative" >
                                    <div class="w-100 h-100 stylish-color-dark position-absolute">
                                        <div class="position-absolute top-50 left-50 translate-middle">
                                            <i class="fas fa-th fa-5x text-light"></i>
                                        </div>
                                    </div>
                                        <img src="${img_url}" class="img-fluid opacity-0" alt="">
                                </div>
                            </a>
                                        `;
                            //             `;
                    }

                    let tmp_str = `
                        <div class="elegant-color z-depth-2 grid-item-content card">
                            ${poster_img}
                            <div class="card-body">
                                <a href="/showbox/detail/${req_type}/${rs[key].id}" class="text-white">
                                    <div class="h3">${title}${character}</div>
                                </a>
                                    <div class="grey-text">${watch_date}</div>
                                    <div class="my-3">${overview}</div>
                            </div>
                        </div>
                                    `;
                    credit_card.insertAdjacentHTML('beforeend', tmp_str)
                credits_parent.append(credit_card);
        };

        // Images Loaded
        imagesLoaded( document.querySelectorAll('.grid-item'), function() {
            // console.log('all images are loaded');
            // Masonry Layout
            var elem = document.querySelector('.grid');
            new Masonry( elem, {
              // options
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
                });
            //Refresh viewport after load?
            AOS.refresh();
        });

        // Animate on scroll
        AOS.refresh();

    })

}
