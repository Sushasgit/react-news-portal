import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../api';
import { fetchData } from '../../actions';
import Grid from '../Grid';

function App() {
  const dispatch = useDispatch();

  const getData = () => {
    return dispatchAction => {
      getArticles().then(res => dispatchAction(fetchData(res.data[0])));
    };
  };

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
