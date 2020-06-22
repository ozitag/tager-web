import React from 'react';

import createCtx from '@/hooks/createCtx';

import { ModalProps, OpenModalFunction } from './Modal.types';

const [useCtx, CtxProvider] = createCtx<OpenModalFunction>();

export function useModal() {
  const context = useCtx();

  return context as <P extends ModalProps>(
    type: React.ElementType<P>,
    props: P['innerProps']
  ) => void;
}

export const ModalContextProvider = CtxProvider;
