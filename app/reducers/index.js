import { REMOVE_ARTICLE } from '../constants';

function reducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        rows: action.payload.data.map(row => ({
          ...row,
          columns: row.columns.map(column => ({
            ...column,
          })),
        })),
      };

    case REMOVE_ARTICLE:
      return {
        ...state,
        rows: state.rows.map(row => ({
          ...row,
          columns: row.columns.filter(item => item.id !== action.payload.aryicleId),
        })),
      };

    case 'RESTORE_ARTICLE':
      const insertByIndex = (state, newItem, insertAt) => [
        ...state.slice(0, insertAt),
        newItem,
        ...state.slice(insertAt),
      ];
      return {
        ...state,
        rows: state.rows.map(row => {
          if (row.id === action.payload.rowId) {
            return {
              ...row,
              columns: insertByIndex(row.columns, action.payload.article, action.payload.index),
            };
          } else {
            return row;
          }
        }),
      };

    default:
      return state;
  }
}

export default reducer;
