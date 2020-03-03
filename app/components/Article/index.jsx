import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';

const Image = styled.img`
  height: auto;
  object-fit: cover;
`;

const FooterLink = styled.div`
  background-color: #000;
  padding: 15px;
  font-size: 25px;
  flex: 1;
`;

const Title = styled.h2`
  color: #fff;
  margin: 0;
  font-size: 25px;
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
`;

const ArticleLink = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
`;

function Article({ column, editMode, handleSubmit }) {
  const [title, setTitle] = useState(column.title);

  const handleChange = e => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  return (
    <Fragment>
      <ArticleLink>
        <Image
          srcSet={`${column.imageUrl}&width=300&height=300 300w,
           ${column.imageUrl}&width=700&height=700 700w,
           ${column.imageUrl}&width=1000&height=1000 1000w`}
          sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw"
          src={`${column.imageUrl}&width=700&height=700 700w`}
          alt="PS4 Slim"
        />
      </ArticleLink>
      <FooterLink>
        {editMode && editMode.editId === column.id ? (
          <Form onSubmit={e => handleSubmit(e, title, column.id)}>
            <Input onChange={e => handleChange(e)} value={title} type="text" />
            <Button type="submit" label="Save" />
          </Form>
        ) : (
          <Title>{column.title}</Title>
        )}
      </FooterLink>
    </Fragment>
  );
}

export default Article;
