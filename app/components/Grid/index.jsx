import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeArticle, editArticle, undoDelete } from '../../actions';

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 350px;
  grid-auto-flow: dense;
  grid-gap: 1em;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1em;
`;

const GridItem = styled.article`
  grid-column-end: span ${props => props.width};
  display: flex;
  flex-flow: column nowrap;
`;

const Image = styled.img`
  width: 100%;
`;

function Grid(props) {
  const [isTest, deleteItem] = useState(false);
  const [items, setDeletedData] = useState(false);
  const [undo, stopDelete] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const { data } = props;
  const modalTimer = useRef(null);

  const showModal = (rowId, article, index) => {
    dispatch(removeArticle(rowId, article.id, index));
    setDeletedData({
      rowId,
      article,
      index,
    });
    deleteItem(!isTest);
  };

  useEffect(() => {
    if (isTest) {
      modalTimer.current = setTimeout(() => {
        deleteItem(false);
      }, 2000);
    }
    return () => modalTimer.current && clearTimeout(modalTimer.current);
  }, [isTest]);

  const handleCancelCall = e => {
    modalTimer.current && clearTimeout(modalTimer.current);
    dispatch(undoDelete(items.rowId, items.article, items.index));
    deleteItem(false);
  };

  return (
    data &&
    data.map((rows, i) => (
      <GridContainer>
        {console.log('DATA', data)}
        {rows.columns &&
          rows.columns.map((column, index) => (
            <GridItem key={column.id} width={column.width}>
              <h2>{column.title}</h2>
              <Image src={column.imageUrl} />
              <button
                type="button"
                onClick={() => {
                  showModal(rows.id, column, index);
                }}>
                Delete
              </button>
            </GridItem>
          ))}
        {isTest ? (
          <div>
            Удалить?
            <button
              onClick={() => {
                handleCancelCall();
                console.log('Clck', undo);
              }}>
              Undo
            </button>
          </div>
        ) : null}
      </GridContainer>
    ))
  );
}

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, {
  removeArticle,
  editArticle,
})(Grid);
