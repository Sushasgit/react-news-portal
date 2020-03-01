import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import getData from '../../api';

import { EditIcon } from '../Icons';

import { BASE_URL, addIdToObjects } from '../../constants';
import Grid from '../Grid';

function App() {
  const content = useSelector(state => state);
  const dispatch = useDispatch();

  function getData() {
    return dispatch => {
      axios.get(BASE_URL).then(res =>
        dispatch({
          type: 'FETCH_DATA',
          data: addIdToObjects(res.data[0]),
        }),
      );
    };
  }

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div>
      <Grid />
      {/* <EditIcon /> */}
    </div>
  );
}

export default App;
