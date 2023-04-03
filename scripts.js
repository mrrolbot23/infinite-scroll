const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
const count = 5;
const apiKey = "ADD_YOUR_API_KEY_HERE";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&&count=${count}`;

// CHeck if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
  }
}

// Helper function to set attribute on DOM Elements
function setAttributes(elemnt, atributes) {
  for (const key in atributes) {
    elemnt.setAttribute(key, atributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    totalImages = photosArray.length;
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photos
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener for images loaded
    image.addEventListener("load", imageLoaded);
    // put <img> inside <a>; then put both inside imageContainer
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

async function getPhotoFromUnsplash() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error
  }
}

// check to see if scrolling near the bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotoFromUnsplash();
  }
});

getPhotoFromUnsplash();
