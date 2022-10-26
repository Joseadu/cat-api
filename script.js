// API KEY
const API_KEY = 'live_dwxtfvLc9fKZsLxasoyYztt2sZjU2E8PTB5u8Y3BEvrbgXHNZMdzVKSJaQWs3pDI'

// FAVOURITES URL
const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites`

// RANDOM CATS URL
const API_URL = `https://api.thecatapi.com/v1/images/search`;

// DELETE CATS URL
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`

const spanError = document.getElementById('error');

let img1 = document.getElementById('img1')
let img2 = document.getElementById('img3')
let img4 = document.getElementById('img4')
let addCatFavourite = document.getElementById('addCatFavourite')


// GENERATE RANDOM CATS
async function randomCats () {
    const response = await fetch(API_URL);
    console.log(response)
    const data = await response.json();
    console.log('Random')
    console.log(data)

    img1.src = data[0].url;
    addCatFavourite.onclick = () => saveFavouriteCat(data[0].id)
}
randomCats();




// HACER POST A LA LISTA DE GATOS FAVORITOS
async function saveFavouriteCat(id) {
    const response = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': `${API_KEY}`
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    console.log('POST')
    console.log(response)
    favouriteCats();
    randomCats();
}



// LEER LISTA DE GATOS FAVORITOS
async function favouriteCats () {
    const response = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'x-api-key': `${API_KEY}`
        }
    });
    const data = await response.json();
    console.log('Favouritess')
    console.log(data)
    const favouriteCatsGrid = document.getElementById('favouriteCatsGrid');
    favouriteCatsGrid.innerHTML = '';

    data.map((element) => {
        // favouriteCats.innerHTML +=
        //     `<div class="element-container">
        //         <img src="${element.image.url}">
        //         <button onclick="" id="deleteCat">Quitar</button>
        //     </div>`
        const elementContainer = document.createElement('div')
        const img = document.createElement('img')
        const btn = document.createElement('button')
        const btnText = document.createTextNode('Borrar')

        elementContainer.className = 'element-container'
        img.src = element.image.url;
        elementContainer.appendChild(img)
        elementContainer.appendChild(btn)
        btn.appendChild(btnText)
        favouriteCatsGrid.appendChild(elementContainer)
        btn.onclick = () => deleteFavouriteCat(element.id)

    })
}
favouriteCats();



// BORRAR GATOS FAVORITOS
async function deleteFavouriteCat (id) {
    const response = await fetch(API_URL_DELETE(id), {
        method: 'DELETE',
        headers: {
            'x-api-key': `${API_KEY}`
        }
    });
    console.log('DELETE')
    console.log(response)

    favouriteCats()
}