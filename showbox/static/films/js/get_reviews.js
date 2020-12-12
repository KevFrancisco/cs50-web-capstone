var reviews_obj;

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
        reviews_obj = r.results;
        if (ea_item.length < 1) {
            reviews.innerHTML = `No reviews available.`;
            return;
        };

        // Let's try to display the images
        for (var key in ea_item) {
            if (ea_item.hasOwnProperty(key)) {
                let review_div = document.createElement('div');
                    review_div.classList.add('light-green', 'darken-3', 'mb-3', 'card');
                    review_div.dataset.aos = 'fade-up';

                let rating;
                    if (ea_item[key].author_details.rating === null) {
                        rating = '';
                    } else {
                        rating = `<div class="h6 my-auto">Rating: ${ea_item[key].author_details.rating}</div>`;
                    }
                // Trim the review to 250 chars, then add ellipses
                let content = ea_item[key].content;
                let length = 500;
                let review_id = ea_item[key].id;
                let review_id_modal = review_id + '-modal';
                let read_more_button = `
                                <a class="mt-3 badge orange darken-2"
                                    onClick="javascript:$('#${review_id_modal}').modal('toggle');">
                                    <span>
                                        Read More
                                    </span>
                                </a>
                                    `;
                let trimmedString = content.length > length ? content.substring(0, length - 3) + "..." + read_more_button : content.substring(0, length);

                let author = ea_item[key].author;
                let rev_url = ea_item[key].url;

                // Full Review Modal
                let reviewer = ` by ${author}`;
                let tmp_str2 = `
                <div class="modal fade" id="${review_id}-modal" tabindex="-1" aria-labelledby="review_modal_label" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
                    <div class="modal-content light-green darken-3">
                      <div class="modal-header border-0 light-green darken-4">
                        <h5 class="modal-title" id="review_modal_label">Review${reviewer}${rating}<h5>
                      </div>
                      <div class="modal-body ws-pre-line">
                        ${content}
                      </div>
                      <div class="modal-footer border-0">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                `;
                document.getElementById('reviews_full').insertAdjacentHTML('beforeend', tmp_str2);
                // $(`#${review_id}-modal`).modal();
                // $(`#${review_id}-modal`).modal('toggle');

                // Card Columns Review
                let tmp_str = `
                    <div class="card-body">
                        <div class="ws-pre-line">
                            ${trimmedString}
                        </div>
                    </div>

                    <div class="card-footer light-green darken-4">
                        <div class="d-flex justify-content-between">
                            ${rating}
                            <div class="h6 my-auto">${author}</div>
                            <div><a class="btn btn-orange btn-sm m-0" href="${rev_url}">View in TMDB</a></div>
                        </div>
                    </div>
                                `;
                review_div.insertAdjacentHTML('beforeend', tmp_str);
                reviews.append(review_div);

            }
        };
        AOS.refresh();
        // console.log(reviews_obj);

    })

}

