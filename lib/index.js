var ROOT = 'root';
var IMG_CONTAINER = 'img-container';
var IMG_TAG = 'img';
var SLIDING_IMG_ID = 'sliding-image';
var currentImageIndex = 0;
var imgSrcArray = [];
var setIntervalRef = null;

createImageSlider = function() {
    console.log('inside createImageSlider...');
    var rootElement = document.getElementById(ROOT);
    if (!rootElement) {
        console.error('div#' + IMG_CONTAINER + ' is missing');
        return;
    }
    var imageContainer = document.getElementById(IMG_CONTAINER);
    if (!imageContainer) {
        console.error('div#' + IMG_CONTAINER + ' inside div#' + ROOT  + ' is missing');
        return;
    }
    var imgElements = imageContainer.getElementsByTagName(IMG_TAG);
    if (!imgElements || !imgElements.length) {
        console.error('img are missing');
        return;
    }

    rootElement.style.position = 'relative';

    imgSrcArray = [];
    for (i = 0; i < imgElements.length; i++) {
        imgSrcArray.push(imgElements[i].attributes.src.value);
    }
    while (imgElements.length > 0) imgElements[0].remove();

    var prevBtn = document.createElement('BUTTON');
    prevBtn.innerHTML = 'Prev';
    prevBtn.style.position = 'absolute';

    prevBtn.style.top = '50%';
    prevBtn.style.left = '1%';
    prevBtn.style.cursor = 'pointer';
    prevBtn.onclick = function() {
        prevIndex();
        changeImage();
        initiateAutoSlide();
    }
    rootElement.append(prevBtn);
    
    var img = document.createElement('IMG');
    img.setAttribute('src', imgSrcArray[currentImageIndex]);
    img.setAttribute('id', SLIDING_IMG_ID);
    imageContainer.append(img);

    var nextBtn = document.createElement('BUTTON');
    nextBtn.innerHTML = 'Next';
    nextBtn.style.position = 'absolute';
    nextBtn.style.top = '50%';
    nextBtn.style.right = '1%';
    nextBtn.style.cursor = 'pointer';
    nextBtn.onclick = function() {
        nextIndex();
        changeImage();
        initiateAutoSlide();
    }
    rootElement.append(nextBtn);

    // Page buttons
    var pageBtnContainer = document.createElement('DIV');
    pageBtnContainer.style.position = 'absolute';
    pageBtnContainer.style.left = '0';
    pageBtnContainer.style.right = '0';
    pageBtnContainer.style.margin = 'auto';
    pageBtnContainer.style.bottom = '10%';


    for (i = 0; i < imgSrcArray.length; i++ ) {
        var pageBtn = document.createElement('BUTTON');
        pageBtn.classList.add('page-btn');
        pageBtn.style.borderRadius = '1px';
        pageBtn.style.borderColor = 'black';
        pageBtn.style.cursor = 'pointer';
        pageBtn.style.width = '1px';
        pageBtn.style.marginLeft = '1px';
        pageBtn.style.backgroundColor = i === 0 ? 'black' : 'white';
        pageBtn.onclick = function(i) {
            currentImageIndex = i;
            changeImage();
            initiateAutoSlide();
        }.bind(this, i);
        pageBtnContainer.append(pageBtn);
    }
    rootElement.append(pageBtnContainer);

    initiateAutoSlide();

};

initiateAutoSlide = function() {
    if (setIntervalRef) {
        clearInterval(setIntervalRef);
        setIntervalRef = null;
    }
    setIntervalRef = setInterval(function() {
        nextIndex();
        changeImage();
    }, 2000);
}

changeImage = function() {
    console.log('currentImageIndex>>', currentImageIndex);
    if (!imgSrcArray || !imgSrcArray[currentImageIndex]) {
        console.error('Image src array not proper');
        return;
    }
    var currentImage = document.getElementById(SLIDING_IMG_ID);
    currentImage.setAttribute('src', imgSrcArray[currentImageIndex]);

    var pageBtns = document.getElementsByClassName('page-btn');
    for (i = 0; i < pageBtns.length; i++) {
        pageBtns[i].style.backgroundColor = i === currentImageIndex ? 'black' : 'white';
    }
}

nextIndex = function() {

    currentImageIndex++;
    console.log('nextIndex>>', currentImageIndex);

    if (currentImageIndex > imgSrcArray.length - 1) {
        currentImageIndex = 0;
    }
}

prevIndex = function() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = imgSrcArray.length - 1;
    }
}

document.addEventListener('DOMContentLoaded', createImageSlider, false);