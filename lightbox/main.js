function showLightbox(img){
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.add('lightboxActive');
    const imgLink = document.querySelector('.lightbox img');
    const imgUrl = img;
    imgLink.src = imgUrl;
}

const images = document.querySelector('.gallery img');
const imagesCount = images.length;
for(let i = 0; i < imagesCount; i++) {
    const img = images[i];
    img.addEventListener("click", showLightbox(img))
}



