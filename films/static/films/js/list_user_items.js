function list_user_items(api_key, item_type) {
    // item type can be either 'favorite' or 'watchlist'
    let main_parent = document.getElementById(`parent_${item_type}`);
    let csrftoken = Cookies.get('csrftoken');
    let url = `/user/list/${item_type}`
    
    fetch(url, {
        method: "PUT",
        headers: { "X-CSRFToken": csrftoken },
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);
        console.log(r.results);

        user_items = r.results;

        for (var key of Object.keys(user_items)) {
            let li = user_items[key];
            main_parent.insertAdjacentHTML('beforebegin', `${li.media_type}: ${li.media_id}`)
        }

    });
}
