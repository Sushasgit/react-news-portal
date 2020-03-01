export const BASE_URL = 'https://storage.googleapis.com/aller-structure-task/test_data.json';

export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export const generateId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let id = '';

  for (let i = 0; i < 8; i += 1) {
    const rand = Math.floor(Math.random() * characters.length);

    id += characters.charAt(rand);
  }
  return id;
};

export const addIdToObjects = array => {
  array.map(row => {
    row.id = generateId();
    row &&
      row.columns.map(column => {
        column.id = generateId();
      });
  });
  return array;
};
