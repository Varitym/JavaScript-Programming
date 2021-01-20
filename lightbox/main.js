function showLightbox(ev){
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.add('lightboxActive');
    const imgLink = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    imgLink.src = imgUrl;
    
    lightbox.addEventListener('click', function hideLightbox(){
    if(ev.target!==imgUrl)lightbox.classList.remove('lightboxActive')});
    
}

const images = document.querySelectorAll('.gallery img');
const imagesCount = images.length;
for(let i = 0; i < imagesCount; i++) {
    const img = images[i];
    img.addEventListener('click', showLightbox)
}



