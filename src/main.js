import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'loaders.css/loaders.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';

const searchForm = document.querySelector('.form');
const inputField = document.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector('.load-more-btn');

let currentQuery = '';
let page = 1;
const PER_PAGE = 15;

/* ===== SUBMIT ===== */
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = inputField.value.trim();

  if (!currentQuery) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page, PER_PAGE);
    const { hits = [], totalHits = 0 } = data; // <- zapobiega undefined

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page, PER_PAGE);
    const { hits = [], totalHits = 0 } = data;

    createGallery(hits);
    smoothScroll();

    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({ message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
});

/* ===== SCROLL ===== */
function smoothScroll() {
  const cardHeight =
    document.querySelector('.gallery a')?.getBoundingClientRect().height || 0;

  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
