import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch, connect } from 'react-redux';
import styled from 'styled-components';

import { removeArticle, editArticle, undoDelete } from '../../actions';
import { DeleteIcon, EditIcon } from '../Icons';
import Toast from '../Toast';
import Article from '../Article';
import GridItem from '../ui/GridItem';
import GridContainer from '../ui/GridContainer';

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
    dispatch(removeArticle(rowId, article.id, index));

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
        <Fragment key={row.id}>
          <GridContainer>
            {row.columns &&
              row.columns.map((column, index) => (
                <GridItem width={column.width}>
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
                </GridItem>
              ))}
          </GridContainer>

          {isTest && items.rowId === row.id ? <Toast undoChanges={handleCancelCall} /> : null}
        </Fragment>
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
