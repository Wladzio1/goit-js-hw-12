import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionType: 'attr',
});

const gallery = document.querySelector('.gallery');
const galleryLoader = document.getElementById('gallery-loader');

function createGallery(images) {
  const markup = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="gallery__item">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoader() {
  if (galleryLoader) {
    galleryLoader.hidden = false;
  } else {
    if (!gallery.querySelector('.loader')) {
      const li = document.createElement('li');
      li.className = 'loader';
      li.setAttribute('role', 'status');
      li.setAttribute('aria-live', 'polite');
      li.textContent = 'Loading…';
      gallery.appendChild(li);
    }
  }
}

function hideLoader() {
  if (galleryLoader) {
    galleryLoader.hidden = true;
    return;
  }

  const loader = gallery.querySelector('.loader');
  if (loader) loader.remove();
}

const loadMoreButton = document.querySelector('.load-more-btn');

function showLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'block';
  }
}

function hideLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}
