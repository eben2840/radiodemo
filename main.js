

/**
 * LOADING
 */

const loadingElement = document.querySelector("[data-loading-container]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.add("loaded");
});


 /**
   * Initiate portfolio lightbox 
   */
 const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


  const likeButtons = [...document.querySelectorAll('.like-button')];
let likedTracks = new Set(); // To store the indices of liked tracks

const toggleLike = (index) => {
    if (likedTracks.has(index)) {
        likedTracks.delete(index);
        likeButtons[index].innerHTML = '<i class="far fa-heart"></i>';
    } else {
        likedTracks.add(index);
        likeButtons[index].innerHTML = '<i class="fas fa-heart"></i>';
    }
};
