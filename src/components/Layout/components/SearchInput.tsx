import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as SearchIcon } from '@assets/svg/search.svg';

const INITIAL_OFFSET = 20;

// TODO Add Reset button
function SearchInput() {
  const [isFixed, setFixed] = useState(false);

  useEffect(() => {
    function listener(this: Document, event: Event) {
      if (INITIAL_OFFSET < window.pageYOffset && !isFixed) {
        setFixed(true);
      }

      if (INITIAL_OFFSET >= window.pageYOffset && isFixed) {
        setFixed(false);
      }
    }

    document.addEventListener('scroll', listener);

    return () => document.removeEventListener('scroll', listener);
  });

  return (
    <Form isFixed={isFixed}>
      <InputContainer>
        <SearchInputIcon />
        <Input type="search" placeholder="Поиск" isFixed={isFixed} />
      </InputContainer>
    </Form>
  );
}

const Input = styled.input<{ isFixed: boolean }>`
  width: 100%;
  height: 45px;
  padding: 0 15px 0 42px;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 18px;
  outline: 0;
  transition: ease border-color 0.2s, ease background-color 0.2s,
    ease box-shadow 0.2s;

  &::placeholder {
    color: #999;
    font-size: inherit;
    line-height: inherit;
  }

  &:focus {
    border-color: #ccc;
    transition: ease border-color 0s, ease background-color 0.2s,
      ease box-shadow 0.2s;
  }

  ${props =>
    props.isFixed
      ? css`
          border-color: transparent;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
          transition: ease border-color 0.2s, ease background-color 0.2s,
            ease box-shadow 0.2s;

          &:focus {
            background-color: white;
          }
        `
      : ''}
`;

const Form = styled.form<{ isFixed: boolean }>`
  left: 50%;
  transform: translateX(-50%);

  ${props =>
    props.isFixed
      ? css`
          position: fixed;
          top: 20px;
          z-index: 2;
        `
      : css`
          position: absolute;
        `};
`;

const InputContainer = styled.div`
  position: relative;
  width: 580px;
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);

  width: 20px;
  height: 20px;
  fill: #c9c9c9;
`;

export default SearchInput;
