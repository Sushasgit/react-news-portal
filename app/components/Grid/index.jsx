import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeArticle, editArticle, undoDelete } from '../../actions';
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
`;

const GridItem = styled.a`
  grid-column-end: span ${props => props.width};
  display: flex;
  flex-direction: column;
  text-decoration: none;
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
  const { rows } = props;
  const modalTimer = useRef(null);

  const showModal = (rowId, article, index) => {
    deleteItem(true);
    dispatch(removeArticle(rowId, article.id, index));
    setDeletedData({
      ...items,
      rowId,
      article,
      index,
    });
  };

  useEffect(() => {
    if (isTest) {
      modalTimer.current = setTimeout(() => {
        deleteItem(false);
      }, 3000);
    }
    return () => modalTimer.current && clearTimeout(modalTimer.current);
  }, [isTest]);

  const handleCancelCall = e => {
    modalTimer.current && clearTimeout(modalTimer.current);
    dispatch(undoDelete(items.rowId, items.article, items.index));
    deleteItem(false);
  };

  return rows ? (
    <div>
      {rows.map((row, i) => (
        <GridContainer>
          {row.columns &&
            row.columns.map((column, index) => (
              <GridItem href={column.url} target="_blank" key={column.id} width={column.width}>
                {/* <h2>{column.title}</h2>
                <Image src={column.imageUrl} />
                <button
                  disabled={isTest}
                  type="button"
                  onClick={() => {
                    showModal(row.id, column, index);
                  }}>
                  Delete
                </button> */}
                <Article column={column} />
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
