function initResults(query, type) {

    resetcontent();
    if (query && query !== '') {

        fetch(`https://api.pexels.com/${type}/search?query=${query.toLowerCase()}&per_page=100`, {
            headers: {
                'Authorization': 'm2c0WnK2IYsbT3W08OUpKdiR7VG52uBffP8nDQTTGVZN3IJdC5do1uie',
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
            .then(json => {

                let content = document.getElementById('content');
                let card;
                if (type == 'v1') {

                    card = json.photos.map(data => createCard(data, type));
                } else {

                    card = json.videos.map(data => createCard(data, type));
                }
                card.forEach(element => {

                    content.appendChild(element);
                });
            });

    } else {

        fetch(`https://api.pexels.com/${type}/search?query=dogs&per_page=100`, {
            headers: {
                'Authorization': 'm2c0WnK2IYsbT3W08OUpKdiR7VG52uBffP8nDQTTGVZN3IJdC5do1uie',
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
            .then(json => {

                let content = document.getElementById('content');
                let card;
                if (type == 'v1') {

                    card = json.photos.map(data => createCard(data, type));
                } else {

                    card = json.videos.map(data => createCard(data, type));
                }
                card.forEach(element => {

                    content.appendChild(element);
                });
            });
    }
}



function createCard(image, type) {

    let col = document.createElement('div');
    let divCard = document.createElement('div');
    divCard.classList = ['card col p-0 border'];
    let cardBody = document.createElement('div');
    cardBody.classList = ['card-body p-0 d-flex justify-content-center'];
    let photo;
    let url;
    if (type == 'v1') {
        url = image.src.original;
        photo = document.createElement('img');
        photo.src = url;
        photo.alt = image.alt;
        photo.style.maxWidth = 'auto';
        photo.style.maxHeight = '200px';
        photo.style.objectFit = 'contain';
    } else {
        console.log(type)
        url = image.video_files[0].link;
        photo = document.createElement('video');
        photo.src = image.video_files[0].link;

        photo.style.width = 'auto';
        photo.style.height = '180px';
        photo.style.objectFit = 'cover';
    }

    cardBody.appendChild(photo);
    cardBody.style.overflow = 'hidden';
    divCard.append(cardBody);
    divCard.style.cursor = 'pointer';
    divCard.addEventListener('click', () => {
        window.location.href = url;
    })
    col.classList.add('col');
    col.appendChild(divCard);
    return col;


}

function resetcontent() {
    let card = document.querySelectorAll('.card');
    card.forEach(element => {
        element.remove();
    })
}


let select = document.getElementById('select-search');

initResults(null, select.value);


let pulsante = document.getElementById('button-search');
pulsante.addEventListener('click', () => {
    let query = document.getElementById('input-search');
    initResults(query.value, select.value);
    query.value = '';
})