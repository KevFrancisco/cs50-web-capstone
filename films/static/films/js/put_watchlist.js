function toggle_watchlist(req_type, req_id) {
    let csrftoken = Cookies.get('csrftoken');
    // API Url from test documentation
    let url = `/toggle/watchlist/${req_type}/${req_id}`
    
    fetch(url, {
        method: "PUT",
        headers: { "X-CSRFToken": csrftoken },
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);

        let mylink = document.getElementById('watchlist_link');
        let mylink_text = document.getElementById('watchlist_link_text');
        if (r.do === "add") {
            mylink.classList.remove('indigo');
            mylink.classList.add('light-green');
            mylink_text.innerText = "Watchlisted!"
            $('#watchlist_link').popover({
                content:"Added to Watch List!",
                placement:"top",
                trigger:"focus"
            });
            $(function () {
                let pop = $('#watchlist_link');
                pop.popover("show") 
                pop.on('shown.bs.popover',function() { 
                    setTimeout(function() {
                    pop.popover("hide")}, 1500); 
                })
            })
        } else {
            mylink.classList.remove('light-green');
            mylink.classList.add('indigo');
            mylink_text.innerText = "Add to Favorites"
        };
    })
}
