
function select_user_icon(name) {
    let profile_field = document.getElementById('id_profile_img'); 
    // let img_path = `/static/films/images/user_icons/${name}.png`;
        profile_field.setAttribute('value', name);

    for (var i = 1; i <= 30; i++) {
        let num = ("00" + i).slice(-3);
        let tmp_elem = document.getElementById(`profile_image_${num}`);
            tmp_elem.classList.remove('border');
    }


    let profile_image_selected = document.getElementById(`profile_image_${name}`);
        profile_image_selected.classList.add('border');
}

function list_user_icons(selected) {
    console.log(selected);
    let elem = document.getElementById('profile_images');
    
    for (var i = 1; i <= 30; i++) {

        let num = ("00" + i).slice(-3);

        let tmp_div = document.createElement('div');
            tmp_div.id = `profile_image_${num}`;
            tmp_div.classList.add('user_icon_list_item', 'my-2', 'p-2');

                if (selected === i) {
                    tmp_div.classList.add('border')
                }

            tmp_div.onclick = function () {
                select_user_icon(num)
            }

        let tmp_str = `
            <img src="/static/films/images/user_icons/${num}.png" class="img-fluid" alt="icon_${num}">
            `
        tmp_div.insertAdjacentHTML('beforeend', tmp_str);
        elem.append(tmp_div);
    }
}
