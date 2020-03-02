import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { BASE_URL, addIdToObjects } from '../../constants';
import { fetchData } from '../../actions';
import Grid from '../Grid';

function App() {
  const dispatch = useDispatch();

  function getData() {
    return dispatch => {
      axios.get(BASE_URL).then(res => dispatch(fetchData(addIdToObjects(res.data[0]))));
    };
  }

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div>
      <Grid />
    </div>
  );
}

export default App;
