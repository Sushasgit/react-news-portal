import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import Title from '../ui/Title';

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
                <Form onSubmit={e => handleSubmit(e, title, column.id)}>
                    <Input
                        onChange={e => handleChange(e)}
                        value={title}
                        type="text"
                    />
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

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 0 2px 2px 0;
    font-size: 16px;
    border-right: 0;
    flex: 1;
    line-height: 1.15;
    border: 1px solid rgba(147, 128, 108, 0.25);
`;

const Form = styled.form`
    display: flex;
    flex: 1;
    margin-bottom: 10px;
`;

const ArticleLink = styled.a`
    text-decoration: none;
    display: flex;
    flex-direction: column;
`;

export default Article;
