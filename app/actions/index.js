import { EDIT_ARTICLE, REMOVE_ARTICLE } from '../constants';

export const fetchData = data => ({
  type: 'FETCH_DATA',
  payload: {
    data,
  },
});

export const editArticle = (article, id) => ({
  type: EDIT_ARTICLE,
  payload: {
    article,
    id,
  },
});

export const removeArticle = (rowId, aryicleId) => ({
  type: REMOVE_ARTICLE,
  payload: {
    rowId,
    aryicleId,
  },
});

export const undoDelete = (rowId, article, index) => ({
  type: 'RESTORE_ARTICLE',
  payload: {
    rowId,
    article,
    index,
  },
});
