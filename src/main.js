import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import pixabayApi from './js/pixabay-api';
import { renderGallery, getHtmlImageList } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryList = document.querySelector('.gallery-list');
const queryToSearch = document.querySelector('.search-form-input');
const submitQuery = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const API_KEY = '42291404-11497e3de12ce0a674f69f05b';

const pixabay = new pixabayApi(API_KEY);
const gallery = new SimpleLightbox('.gallery-list a', {
  captionDelay: 250,
  captionsData: 'alt',
});

submitQuery.addEventListener('submit', e => {
  e.preventDefault();
  galleryList.innerHTML = '';
  const query = queryToSearch.value;
  if (isValidQuery(query)) {
    isLoaderVisible(loader, true);
    pixabay
      .getImageList(query)
      .then(imagesList => getHtmlImageList(imagesList.hits))
      .then(htmlImageList => renderGallery(htmlImageList, galleryList))
      .then(() => {
        isLoaderVisible(loader, false);
        gallery.refresh();
      });
  } else {
    iziToast.error({
      message: 'Search field is empty',
      progressBar: false,
      transitionIn: 'fadeIn',
      position: 'topRight',
    });
  }
});

function isValidQuery(queryToSearch) {
  if (queryToSearch.trim() === '') {
    return false;
  } else {
    return true;
  }
}

function isLoaderVisible(loader, isVisible = false) {
  if (isVisible) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}
