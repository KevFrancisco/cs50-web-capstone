function toggle_favorite(req_type, req_id) {
    let csrftoken = Cookies.get('csrftoken');
    // API Url from test documentation
    let url = `/showbox/toggle/favorite/${req_type}/${req_id}`
    
    fetch(url, {
        method: "PUT",
        headers: { "X-CSRFToken": csrftoken },
    })
    .then(Response => Response.json())
    .then(r =>{
        console.log(r);

        let mylink = document.getElementById('favorite_link');
        let mylink_text = document.getElementById('favorite_link_text');
        if (r.do === "add") {
            mylink.classList.remove('indigo');
            mylink.classList.add('light-green');
            mylink_text.innerText = "Favorite!"
            $('#favorite_link').popover({
                content:"Added to Favorites!",
                placement:"top",
                trigger:"focus"
            });
            $(function () {
                let pop = $('#favorite_link');
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
