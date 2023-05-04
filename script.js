// prevent text/element highlighting, copying
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false)

// custom cursor
// const cursor = document.querySelector('.cursor');

// document.addEventListener('mousemove', (e) => {
//     cursor.style.top = e.pageY + 'px'
//     cursor.style.left = e.pageX + 'px'
// })

// custom scroll padding
// const navigation = document.querySelector(".primary-navigation")
// const navigationHeight = navigation.offsetHeight;
// document.documentElement.style.setProperty("--scroll-padding", navigationHeight + "px") 

// Pexels API key pABi2Crx704emiY1IjgCpTiYwBiSkgTf9i6AOrA8u9hPfIV69hzPXFfV

// download icon <i class="fa-solid fa-download"></i>
// "https://api.pexels.com/v1/curated?per_page=15&page=1"

const auth = "pABi2Crx704emiY1IjgCpTiYwBiSkgTf9i6AOrA8u9hPfIV69hzPXFfV";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search-form');
const submitButton = document.querySelector('.submit-btn');
const moreButton = document.querySelector('.more');
const logo = document.querySelector('#logo');
let page = 1;
let searchValue;
let fetchLink;
let currentSearch;

// event listeners
logo.addEventListener('click', clear)
searchInput.addEventListener('input', updateInput);
searchForm.addEventListener('submit', (e) => {
    // prevent auto refreshing on submit
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})
moreButton.addEventListener('click', loadMore);

function updateInput(e){
    searchValue = e.target.value
}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

async function generatePhotos(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <img src=${photo.src.large} alt=${photo.alt}></img>
        <div class="info">
        <a href=${photo.photographer_url} target="_blank"><p class="photographer">${photo.photographer}</p></a>
        <a href=${photo.src.original} class="download">download<i class="fa-solid fa-download"></i></a>
        </div>`;
        gallery.appendChild(galleryImg)
    })
}

async function curatedPhotos() {
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1'
    const data = await fetchApi(fetchLink)
    generatePhotos(data);
}

async function searchPhotos(search) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`
    const data = await fetchApi(fetchLink)
    generatePhotos(data);  
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}


async function loadMore() {
    console.log('searching ' + currentSearch)
    page++;
    if(currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }
    const data = await fetchApi(fetchLink)
    generatePhotos(data)
}

curatedPhotos();
