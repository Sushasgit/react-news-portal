import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import styled from 'styled-components';

import { removeArticle, editArticle, undoDelete } from '../../actions';
import { DeleteIcon, EditIcon } from '../Icons';
import Article from '../Article';
import GridItem from '../ui/GridItem';
import GridContainer from '../ui/GridContainer';
import Spinner from '../ui/Spinner';
import Toast from '../ui/Toast';
import Button from '../ui/Button';

function ArticlesList(props) {
    const { view } = props;
    const [deleteMode, deleteItem] = useState(false);
    const [deletedData, setDeletedData] = useState(false);
    const [editMode, editData] = useState(null);

    const rows = useSelector(state => state.rows);
    const dispatch = useDispatch();
    const modalTimer = useRef(null);

    useEffect(() => {
        if (deleteMode) {
            modalTimer.current = setTimeout(() => {
                deleteItem(false);
            }, 3000);
        }
        return () => modalTimer.current && clearTimeout(modalTimer.current);
    }, [deleteMode]);

    const handleCancelCall = e => {
        e.preventDefault();
        dispatch(
            undoDelete(
                deletedData.rowId,
                deletedData.article,
                deletedData.index,
            ),
        );
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
                    <GridContainer view={view}>
                        {row.columns &&
                            row.columns.map((column, index) => (
                                <GridItem
                                    view={view}
                                    key={column.id}
                                    width={column.width}>
                                    <Article
                                        view={view}
                                        handleSubmit={handleSubmit}
                                        editMode={editMode}
                                        column={column}
                                    />
                                    <ButtonGroup view={view}>
                                        <Button
                                            view="iconBtn"
                                            disabled={deleteMode}
                                            type="button"
                                            onClick={e => {
                                                showModal(
                                                    e,
                                                    row.id,
                                                    column,
                                                    index,
                                                );
                                            }}>
                                            <DeleteIcon />
                                        </Button>
                                        <Button
                                            view="iconBtn"
                                            onClick={e => {
                                                editTitle(e, column.id);
                                            }}>
                                            <EditIcon />
                                        </Button>
                                    </ButtonGroup>
                                </GridItem>
                            ))}
                    </GridContainer>

                    {deleteMode && deletedData.rowId === row.id ? (
                        <Toast undoChanges={handleCancelCall} />
                    ) : null}
                </Fragment>
            ))}
        </div>
    ) : (
        <div>
            <Spinner />
        </div>
    );
}

const ButtonGroup = styled.section`
    position: ${props => (props.view === 'full' ? 'absolute' : 'static')};
    top: 20px;
    right: 20px;
    z-index: 100;
`;

export default ArticlesList;
