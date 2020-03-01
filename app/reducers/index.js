import { REMOVE_ARTICLE } from '../constants';

function reducer(state = { data: '' }, action) {
  console.log(action);
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        data: action.data,
      };
    case REMOVE_ARTICLE:
      const row = state.data.find(x => x.id === action.payload.rowId);
      const article = row.columns.find(x => x.id === action.payload.aryicleId);
      const newRow = row.columns.filter(item => item.id != action.payload.aryicleId);
      newRow[0] ? (newRow[0].width = newRow[0].width + article.width) : null;
      row.columns = newRow;
      const indexOldElement = state.data.findIndex(({ id }) => id == row.id);
      const newArray = Object.assign([...state.data], { [indexOldElement]: row });
      return {
        ...state,
        data: newArray,
      };
    case 'RESTORE_ARTICLE':
      console.log(action.payload);
      const rowRestore = state.data.find(x => x.id === action.payload.rowId);
      rowRestore.columns = [...rowRestore.columns, action.payload.article];
      const rowTest = rowRestore.columns.filter(item => item.id != action.payload.aryicleId);
      rowTest[0] ? (rowTest[0].width = rowTest[0].width - action.payload.article.width) : null;
      console.log('RESTORE', rowRestore.columns);
      const restoreIndex = state.data.findIndex(({ id }) => id == rowRestore.id);
      const arrayAfterRestore = Object.assign([...state.data], { [restoreIndex]: rowRestore });
      return {
        ...state,
        data: arrayAfterRestore,
      };

    default:
      return state;
  }
}

export default reducer;
