import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Button from '../ui/Button';
import Title from '../ui/Title';
import Input from '../ui/Input';

function Article({ column, editMode, handleSubmit, view }) {
    const [title, setTitle] = useState(column.title);

    const handleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    return (
        <Fragment>
            {view === 'full' ? (
                <ArticleLink href={column.url} target="_blank">
                    <Image
                        srcSet={`${column.imageUrl}&width=300&height=300 300w,
                        ${column.imageUrl}&width=700&height=700 700w,
                        ${column.imageUrl}&width=1000&height=1000 1000w`}
                        sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw"
                        src={`${column.imageUrl}&width=700&height=700 700w`}
                        alt={column.title}
                        loading="lazy"
                    />
                </ArticleLink>
            ) : null}
            {editMode && editMode.editId === column.id ? (
                <Form
                    view={view}
                    onSubmit={e => handleSubmit(e, title, column.id)}>
                    <Input handleChange={handleChange} title={title} />
                    <Button disabled={!title} type="submit" label="Save" />
                </Form>
            ) : (
                <Title view={view} column={column} />
            )}
        </Fragment>
    );
}

const Image = styled.img`
    height: auto;
    object-fit: cover;
    max-width: 100%;
`;

const Form = styled.form`
    display: flex;
    flex: ${props => (props.view === 'full' ? 'unset' : '1')};
    margin-bottom: 10px;
`;

const ArticleLink = styled.a`
    text-decoration: none;
    display: flex;
    flex-direction: column;
`;

export default Article;
