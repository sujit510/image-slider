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

    imgSrcArray = [];
    for (i = 0; i < imgElements.length; i++) {
        imgSrcArray.push(imgElements[i].attributes.src.value);
    }
    while (imgElements.length > 0) imgElements[0].remove();

    var prevBtn = document.createElement('BUTTON');
    prevBtn.innerHTML = 'Prev';
    prevBtn.onclick = function() {
        prevIndex();
        changeImage();
        initiateAutoSlide();
    }
    rootElement.append(prevBtn);
    
    var img = document.createElement('IMG');
    img.setAttribute('src', imgSrcArray[currentImageIndex]);
    img.setAttribute('id', SLIDING_IMG_ID);
    rootElement.append(img);

    var nextBtn = document.createElement('BUTTON');
    nextBtn.innerHTML = 'Next';
    nextBtn.onclick = function() {
        nextIndex();
        changeImage();
        initiateAutoSlide();
    }
    rootElement.append(nextBtn);

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
    currentImage.setAttribute('src', imgSrcArray[currentImageIndex])
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