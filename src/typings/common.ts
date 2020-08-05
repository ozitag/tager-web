import { FunctionComponent } from 'react';
import { CustomApp_PageContext } from '@/typings/hocs';

export type PageModuleType = {
  component: FunctionComponent;
  getInitialProps?: (context: CustomApp_PageContext) => Promise<unknown>;
  template: string;
};
