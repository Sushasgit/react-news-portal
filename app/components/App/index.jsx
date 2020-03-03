import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { getArticles } from '../../api';
import { fetchData } from '../../actions';
import Grid from '../Grid';

const theme = {
  primary: '#6e27c5',
};

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
    <ThemeProvider theme={theme}>
      <Grid />
    </ThemeProvider>
  );
}

export default App;
