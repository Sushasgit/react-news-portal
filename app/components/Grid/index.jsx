import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux';
import styled from 'styled-components';

import { removeArticle, editArticle, undoDelete } from '../../actions';
import { DeleteIcon, EditIcon } from '../Icons';
import Toast from '../Toast';
import Article from '../Article';

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  grid-gap: 1em;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1em;

  @media (max-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 720px) {
    display: block;
    padding: 0;
  }
`;

const GridItem = styled.div`
  grid-column-end: span ${props => props.width};
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 900px) {
    grid-column-end: span 3;
  }

  @media (max-width: 720px) {
    margin-bottom: 1em;
  }
`;

const ButtonGroup = styled.section`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
`;

const Button = styled.button`
  background: #fff;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-right: 15px;
  border: none;
  transition: color 0.6s ease-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

function Grid(props) {
  const [isTest, deleteItem] = useState(false);
  const [items, setDeletedData] = useState(false);
  const [editMode, editData] = useState(null);
  const dispatch = useDispatch();
  const { rows } = props;
  const modalTimer = useRef(null);

  useEffect(() => {
    if (isTest) {
      modalTimer.current = setTimeout(() => {
        deleteItem(false);
      }, 3000);
    }
    return () => modalTimer.current && clearTimeout(modalTimer.current);
  }, [isTest]);

  const handleCancelCall = e => {
    e.preventDefault();
    dispatch(undoDelete(items.rowId, items.article, items.index));
    deleteItem(false);
    return () => modalTimer.current && clearTimeout(modalTimer.current);
  };

  const showModal = (e, rowId, article, index) => {
    e.preventDefault();
    deleteItem(true);
    if (index) {
      dispatch(removeArticle(rowId, article.id, index));
    } else {
      deleteItem(true);
    }
    setDeletedData({
      rowId,
      article,
      index,
    });
  };

  const editTitle = (e, editId) => {
    e.preventDefault();
    editData({
      editId,
    });
  };

  const handleSubmit = (e, title, id) => {
    e.preventDefault();
    dispatch(editArticle(title, id));
    editData(null);
  };

  return rows ? (
    <div>
      {rows.map((row, i) => (
        <GridContainer key={row.id}>
          {row.columns &&
            row.columns.map((column, index) => (
              <GridItem href={column.url} target="_blank" key={column.id} width={column.width}>
                <Article handleSubmit={handleSubmit} editMode={editMode} column={column} />
                <ButtonGroup>
                  <Button
                    disabled={isTest}
                    type="button"
                    onClick={e => {
                      showModal(e, row.id, column, index);
                    }}>
                    <DeleteIcon />
                  </Button>
                  <Button
                    onClick={e => {
                      editTitle(e, column.id);
                    }}>
                    <EditIcon />
                  </Button>
                </ButtonGroup>
                {isTest && items.rowId === row.id ? <Toast undoChanges={handleCancelCall} /> : null}
              </GridItem>
            ))}
        </GridContainer>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

const mapStateToProps = state => ({
  rows: state.rows,
});

export default connect(mapStateToProps, {
  removeArticle,
  editArticle,
})(Grid);
