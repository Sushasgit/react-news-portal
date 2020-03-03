export const BASE_URL = 'https://storage.googleapis.com/aller-structure-task/test_data.json';

export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export const insertByIndex = (state, newItem, insertAt) => [
  ...state.slice(0, insertAt),
  newItem,
  ...state.slice(insertAt),
];
