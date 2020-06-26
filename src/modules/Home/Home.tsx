import Link from '@/components/Link';
import { selectCount, increment, decrement } from '@/store/reducers/example';
import { useTranslation } from '@server/i18n';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as NextLogo } from '@/assets/svg/nextjs-logo.svg';

function Home() {
  const { t } = useTranslation();
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <h1>{t('hello')}</h1>
      <NextLogo />
      <Link to="/test">
        <h2>Go to test</h2>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  background-image: radial-gradient(#d7d7d7 1px, transparent 1px),
    radial-gradient(#d7d7d7 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Home;
