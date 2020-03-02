import React, { Fragment } from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: auto;
  object-fit: cover;
`;

const Title = styled.h2`
  background-color: #000;
  color: #fff;
  margin: 0;
  padding: 15px;
  font-size: 25px;
  flex: 1;
`;

function Article({ column }) {
  console.log(column.imageUrl);
  return (
    <Fragment>
      <Image
        srcSet={`${column.imageUrl}&width=300&height=300 300w,
           ${column.imageUrl}&width=700&height=700 700w,
           ${column.imageUrl}&width=1000&height=1000 1000w`}
        sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw"
        src={`${column.imageUrl}&width=700&height=700 700w`}
        alt="PS4 Slim"
      />

      <Title>{column.title}</Title>
      <button
        type="button"
        onClick={() => {
          showModal(row.id, column, index);
        }}>
        Delete
      </button>
    </Fragment>
  );
}

export default Article;
